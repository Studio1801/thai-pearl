import { useMemo, useState } from "react";
import type { MenuItem, Settings, Size } from "@shared/model";
import { isSoldOut, priceLabel, restaurantNow, slug } from "@shared/model";
import { Sheet } from "@/components/order/sheet";
import { useSaveSettings } from "./api";
import { Btn, Switch, TextField, useToast } from "./ui";

export function MenuTab({ site }: { site: Settings }) {
  const save = useSaveSettings();
  const toast = useToast();
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<{ categoryId: string; item: MenuItem | null } | null>(null);
  const today = restaurantNow().day;

  const soldOut = useMemo(() => site.menu.flatMap((c) => c.items).filter((i) => isSoldOut(i)), [site]);
  const q = query.trim().toLowerCase();

  const commit = async (next: Settings, msg: string) => {
    try {
      await save(next);
      toast(msg);
    } catch (e) {
      toast((e as Error).message, true);
    }
  };

  const patchItem = (id: string, change: Partial<MenuItem>) =>
    structuredClone({
      ...site,
      menu: site.menu.map((c) => ({ ...c, items: c.items.map((i) => (i.id === id ? { ...i, ...change } : i)) })),
    });

  const toggleSoldOut = (item: MenuItem, out: boolean) =>
    commit(
      patchItem(item.id, { soldOutOn: out ? today : null }),
      out ? `${item.name} shows as sold out on the website` : `${item.name} is back on the website`,
    );

  return (
    <div className="max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between mb-2">
        <p className="font-sans text-[15px] text-[#8A7060] max-w-md">
          Run out of something? Flip it to sold out. It comes back on its own tomorrow. Tap any dish to change its name,
          price or description.
        </p>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find a dish"
          className="rounded-md bg-white border border-[#E4D7C3] focus:border-[#180E06] outline-none px-3 py-2.5 font-sans text-[15px] w-full sm:w-56"
        />
      </div>
      {soldOut.length > 0 && (
        <p className="font-sans text-sm text-[#180E06] mt-4">
          <span className="font-semibold">Sold out today:</span> {soldOut.map((i) => i.name).join(", ")}
        </p>
      )}

      {site.menu.map((cat) => {
        const items = q ? cat.items.filter((i) => i.name.toLowerCase().includes(q)) : cat.items;
        if (q && !items.length) return null;
        return (
          <section key={cat.id} className="mt-10">
            <div className="flex items-baseline justify-between border-b-2 border-[#180E06] pb-2">
              <h3 className="font-serif text-xl text-[#180E06]" style={{ fontWeight: 500 }}>
                {cat.name}
              </h3>
              <span className="font-sans text-xs text-[#8A7060]">Sold out</span>
            </div>
            <ul className="divide-y divide-[#E4D7C3]">
              {items.map((item) => {
                const out = isSoldOut(item);
                return (
                  <li key={item.id} className="flex items-center gap-4 py-3">
                    <button onClick={() => setEditing({ categoryId: cat.id, item })} className="flex-1 min-w-0 text-left group">
                      <span className={`font-sans text-[15px] font-semibold group-hover:text-[#C4281A] ${out ? "text-[#180E06]/45 line-through" : "text-[#180E06]"}`}>
                        {item.name}
                      </span>
                      <span className="block font-sans text-sm text-[#8A7060]">
                        {priceLabel(item)}
                        {item.protein && " + protein"}
                        {item.hidden && <span className="text-[#C4281A]">, hidden from the website</span>}
                      </span>
                    </button>
                    <Switch label={`${item.name} sold out`} on={out} onChange={(v) => toggleSoldOut(item, v)} />
                  </li>
                );
              })}
            </ul>
            {!q && (
              <button
                onClick={() => setEditing({ categoryId: cat.id, item: null })}
                className="mt-2 font-sans text-sm font-semibold text-[#C4281A] hover:underline underline-offset-2"
              >
                + Add a dish to {cat.name}
              </button>
            )}
          </section>
        );
      })}

      <ItemEditor
        key={editing?.item?.id ?? `new-${editing?.categoryId}`}
        open={!!editing}
        item={editing?.item ?? null}
        onClose={() => setEditing(null)}
        onSave={async (item) => {
          const cid = editing!.categoryId;
          const exists = site.menu.some((c) => c.items.some((i) => i.id === item.id));
          const next = structuredClone({
            ...site,
            menu: site.menu.map((c) =>
              c.id !== cid ? c : { ...c, items: exists ? c.items.map((i) => (i.id === item.id ? item : i)) : [...c.items, item] },
            ),
          });
          await commit(next, exists ? `${item.name} updated on the website` : `${item.name} added to the menu`);
          setEditing(null);
        }}
        onDelete={async (item) => {
          if (!window.confirm(`Remove ${item.name} from the menu for good? You can hide it instead if it's seasonal.`)) return;
          const next = structuredClone({ ...site, menu: site.menu.map((c) => ({ ...c, items: c.items.filter((i) => i.id !== item.id) })) });
          await commit(next, `${item.name} removed`);
          setEditing(null);
        }}
      />
    </div>
  );
}

function ItemEditor({
  open,
  item,
  onClose,
  onSave,
  onDelete,
}: {
  open: boolean;
  item: MenuItem | null;
  onClose: () => void;
  onSave: (i: MenuItem) => Promise<void>;
  onDelete: (i: MenuItem) => Promise<void>;
}) {
  const [name, setName] = useState(item?.name ?? "");
  const [thai, setThai] = useState(item?.thai ?? "");
  const [desc, setDesc] = useState(item?.desc ?? "");
  const [price, setPrice] = useState(String(item?.price ?? ""));
  const [sizes, setSizes] = useState<Size[]>(item?.sizes ?? []);
  const [protein, setProtein] = useState(!!item?.protein);
  const [hidden, setHidden] = useState(!!item?.hidden);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!name.trim()) return;
    setBusy(true);
    const cleanSizes = sizes.filter((z) => z.label.trim()).map((z) => ({ label: z.label.trim(), price: Number(z.price) || 0 }));
    await onSave({
      ...(item ?? {}),
      id: item?.id ?? `${slug(name)}-${Math.random().toString(36).slice(2, 5)}`,
      name: name.trim(),
      thai: thai.trim() || undefined,
      desc: desc.trim() || undefined,
      price: cleanSizes.length ? cleanSizes[0].price : Number(price) || 0,
      sizes: cleanSizes.length ? cleanSizes : undefined,
      protein,
      hidden,
      soldOutOn: item?.soldOutOn ?? null,
    });
    setBusy(false);
  };

  return (
    <Sheet open={open} onClose={onClose} label={item ? `Edit ${item.name}` : "New dish"}>
      <div className="px-6 pt-7 pb-6 space-y-4 bg-[#F6EFE3]">
        <div className="flex items-baseline justify-between">
          <h3 className="font-serif text-2xl" style={{ fontWeight: 500 }}>
            {item ? "Edit dish" : "New dish"}
          </h3>
          <button onClick={onClose} className="font-sans text-sm text-[#8A7060] hover:text-[#180E06]">
            Close
          </button>
        </div>
        <TextField label="Name" value={name} onChange={setName} />
        <TextField label="Thai name (optional)" value={thai} onChange={setThai} />
        <TextField label="Description" value={desc} onChange={setDesc} multiline />

        {sizes.length === 0 ? (
          <div className="flex items-end gap-4">
            <div className="w-32">
              <TextField label="Price ($)" value={price} onChange={setPrice} inputMode="decimal" />
            </div>
            <button
              type="button"
              onClick={() => setSizes([{ label: "Cup", price: Number(price) || 0 }, { label: "Bowl", price: 0 }])}
              className="font-sans text-sm text-[#C4281A] font-semibold pb-3"
            >
              Has sizes?
            </button>
          </div>
        ) : (
          <div>
            <p className="font-sans text-xs font-semibold text-[#8A7060]">Sizes and prices</p>
            {sizes.map((z, i) => (
              <div key={i} className="flex gap-3 mt-2">
                <input
                  value={z.label}
                  onChange={(e) => setSizes(sizes.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))}
                  className="flex-1 rounded-md bg-white border border-[#E4D7C3] px-3 py-2.5 font-sans text-[15px]"
                />
                <input
                  value={String(z.price)}
                  inputMode="decimal"
                  onChange={(e) => setSizes(sizes.map((x, j) => (j === i ? { ...x, price: e.target.value as unknown as number } : x)))}
                  className="w-24 rounded-md bg-white border border-[#E4D7C3] px-3 py-2.5 font-sans text-[15px]"
                />
                <button type="button" onClick={() => setSizes(sizes.filter((_, j) => j !== i))} className="font-sans text-sm text-[#8A7060] px-1">
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={() => setSizes([...sizes, { label: "", price: 0 }])} className="mt-2 font-sans text-sm text-[#C4281A] font-semibold">
              + Another size
            </button>
          </div>
        )}

        <label className="flex items-center justify-between gap-4 pt-2">
          <span className="font-sans text-[15px]">
            Guests pick a protein
            <span className="block text-sm text-[#8A7060]">Adds the protein prices from the Restaurant tab</span>
          </span>
          <Switch label="Asks for protein" on={protein} onChange={setProtein} />
        </label>
        <label className="flex items-center justify-between gap-4">
          <span className="font-sans text-[15px]">
            Hide from the website
            <span className="block text-sm text-[#8A7060]">For seasonal dishes. Keeps it here for later.</span>
          </span>
          <Switch label="Hidden" on={hidden} onChange={setHidden} />
        </label>
      </div>
      <div className="sticky bottom-0 bg-[#F6EFE3] border-t border-[#E4D7C3] px-6 py-4 flex items-center gap-3">
        {item && (
          <button onClick={() => onDelete(item)} className="font-sans text-sm text-[#8A7060] hover:text-[#C4281A] mr-auto">
            Delete dish
          </button>
        )}
        <Btn tone="crimson" className={item ? "" : "w-full"} disabled={busy || !name.trim()} onClick={submit}>
          {busy ? "Saving..." : item ? "Save to website" : "Add to menu"}
        </Btn>
      </div>
    </Sheet>
  );
}
