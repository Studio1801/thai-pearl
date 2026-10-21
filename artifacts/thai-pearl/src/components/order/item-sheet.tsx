import { useEffect, useState } from "react";
import type { MenuItem, Settings } from "@shared/model";
import { SPICE, money, unitPrice } from "@shared/model";
import { bagActions } from "@/lib/live";
import { Choice, Sheet, Stepper } from "./sheet";

// Categories where the kitchen asks how hot you want it.
const SPICY = new Set(["salads", "soups", "noodles", "stir-fry", "chef-specials", "curries"]);

export function ItemSheet({
  item,
  categoryId,
  site,
  onClose,
}: {
  item: MenuItem | null;
  categoryId: string;
  site: Settings;
  onClose: () => void;
}) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState<string>();
  const [protein, setProtein] = useState<string>();
  const [spice, setSpice] = useState<number>(1);

  useEffect(() => {
    if (!item) return;
    setQty(1);
    setSize(item.sizes?.[0]?.label);
    setProtein(item.protein ? site.proteins[0]?.label : undefined);
    setSpice(1);
    // reset only when a different dish opens, not when the live menu refreshes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.id]);

  if (!item) return null;

  const asksSpice = SPICY.has(categoryId) || !!item.protein;
  const unit = unitPrice(item, site.proteins, size, protein);

  const add = () => {
    bagActions.add({ itemId: item.id, qty, size, protein, spice: asksSpice ? spice : undefined });
    onClose();
  };

  return (
    <Sheet open={!!item} onClose={onClose} label={item.name}>
      <div className="px-6 pt-7 pb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl leading-tight" style={{ fontWeight: 500 }}>
              {item.name}
            </h3>
            {item.thai && (
              <p className="font-serif text-[#C4281A]/60 text-sm mt-1" style={{ fontWeight: 400 }}>
                {item.thai}
              </p>
            )}
          </div>
          <button onClick={onClose} className="font-sans text-sm text-[#180E06]/50 hover:text-[#180E06] -mt-1" aria-label="Close">
            Close
          </button>
        </div>
        {item.desc && <p className="font-sans text-sm text-[#7A6A60] mt-3 leading-relaxed">{item.desc}</p>}

        <div className="mt-6 space-y-6">
          {item.sizes && item.sizes.length > 1 && (
            <Field label="Size">
              <Choice<string>
                options={item.sizes.map((z) => z.label)}
                value={size}
                onChange={setSize}
                render={(l) => `${l} ${money(item.sizes!.find((z) => z.label === l)!.price)}`}
              />
            </Field>
          )}
          {item.protein && (
            <Field label="Protein">
              <Choice<string>
                options={site.proteins.map((p) => p.label)}
                value={protein}
                onChange={setProtein}
                render={(l) => {
                  const p = site.proteins.find((x) => x.label === l)!;
                  return p.price ? `${l} +${money(p.price)}` : l;
                }}
              />
            </Field>
          )}
          {asksSpice && (
            <Field label="How hot">
              <Choice<number> options={[1, 2, 3, 4, 5]} value={spice} onChange={setSpice} render={(n) => `${n} ${SPICE[n - 1]}`} />
            </Field>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 bg-[#FDF7EC] border-t border-[#E8DCC8] px-6 py-4 flex items-center gap-4">
        <Stepper value={qty} onChange={setQty} />
        <button
          onClick={add}
          className="flex-1 bg-[#C4281A] hover:bg-[#a42016] text-white font-sans font-semibold text-sm py-3.5 transition-colors"
        >
          Add to bag, {money(unit * qty)}
        </button>
      </div>
    </Sheet>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-sans text-xs font-semibold text-[#8A7060] mb-2.5">{label}</p>
      {children}
    </div>
  );
}
