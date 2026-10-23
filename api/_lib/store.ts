/// <reference lib="dom" />
// Tiny JSON store. Vercel Blob in production (private store, conditional
// writes so two orders landing at the same moment never overwrite each other).
// Without a BLOB_READ_WRITE_TOKEN it falls back to local files for development.

import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { BlobPreconditionFailedError, get, put } from "@vercel/blob";

type Read<T> = { data: T; etag: string } | null;

const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;
const LOCAL_DIR = path.join(process.cwd(), ".data");

class Conflict extends Error {}

async function readRaw<T>(key: string): Promise<Read<T>> {
  if (useBlob) {
    const res = await get(key, { access: "private", useCache: false });
    if (!res || res.statusCode !== 200) return null;
    const text = await new Response(res.stream).text();
    return { data: JSON.parse(text) as T, etag: res.blob.etag };
  }
  try {
    const text = await fs.readFile(path.join(LOCAL_DIR, key), "utf8");
    return { data: JSON.parse(text) as T, etag: crypto.createHash("md5").update(text).digest("hex") };
  } catch {
    return null;
  }
}

async function writeRaw(key: string, data: unknown, etag: string | null) {
  const body = JSON.stringify(data);
  if (useBlob) {
    try {
      await put(key, body, {
        access: "private",
        contentType: "application/json",
        addRandomSuffix: false,
        cacheControlMaxAge: 60,
        ...(etag ? { allowOverwrite: true, ifMatch: etag } : { allowOverwrite: false }),
      });
    } catch (e) {
      if (e instanceof BlobPreconditionFailedError) throw new Conflict();
      // creating a blob that someone else just created
      if (!etag && e instanceof Error && /exist/i.test(e.message)) throw new Conflict();
      throw e;
    }
    return;
  }
  const file = path.join(LOCAL_DIR, key);
  await fs.mkdir(path.dirname(file), { recursive: true });
  const current = await readRaw(key);
  if ((current?.etag ?? null) !== etag) throw new Conflict();
  await fs.writeFile(file, body);
}

export async function read<T>(key: string): Promise<T | null> {
  return (await readRaw<T>(key))?.data ?? null;
}

/** Read, change, write. Retries if someone else wrote in between. */
export async function update<T, R = T>(key: string, fallback: () => T, change: (data: T) => R | Promise<R>): Promise<{ data: T; result: R }> {
  for (let attempt = 0; attempt < 6; attempt++) {
    const current = await readRaw<T>(key);
    const data = current ? current.data : fallback();
    const result = await change(data);
    try {
      await writeRaw(key, data, current?.etag ?? null);
      return { data, result };
    } catch (e) {
      if (!(e instanceof Conflict)) throw e;
      await new Promise((r) => setTimeout(r, 40 + Math.random() * 120));
    }
  }
  throw new Error("Busy, try again");
}
