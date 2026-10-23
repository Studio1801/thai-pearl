/// <reference types="node" />
/// <reference lib="dom" />
// GET /api/health -> whether this deployment can save anything.
// Without storage and a PIN the website runs its demo mode in the browser.

import { json } from "./_lib/http";

export function GET() {
  const live = !!process.env.BLOB_READ_WRITE_TOKEN && !!process.env.DASHBOARD_PIN;
  return json({ live });
}
