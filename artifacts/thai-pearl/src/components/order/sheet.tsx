import { AnimatePresence, motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";

/** Bottom sheet on phones, a centered panel on larger screens. */
export function Sheet({ open, onClose, children, label }: { open: boolean; onClose: () => void; children: ReactNode; label: string }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center" role="dialog" aria-modal="true" aria-label={label}>
          <motion.div
            className="absolute inset-0 bg-[#180E06]/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="relative w-full md:max-w-lg max-h-[92vh] overflow-y-auto bg-[#FDF7EC] text-[#180E06] shadow-[0_-10px_40px_rgba(24,14,6,0.25)]"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function Stepper({ value, onChange, min = 1 }: { value: number; onChange: (n: number) => void; min?: number }) {
  return (
    <div className="inline-flex items-center bg-[#180E06]/[0.06]">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-10 h-10 font-sans text-lg text-[#180E06]/70 hover:text-[#C4281A]"
        aria-label="One less"
      >
        &minus;
      </button>
      <span className="w-8 text-center font-serif text-lg" style={{ fontWeight: 500 }}>
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(20, value + 1))}
        className="w-10 h-10 font-sans text-lg text-[#180E06]/70 hover:text-[#C4281A]"
        aria-label="One more"
      >
        +
      </button>
    </div>
  );
}

/** A row of choices where the picked one fills in. */
export function Choice<T extends string | number>({
  options,
  value,
  onChange,
  render,
}: {
  options: T[];
  value: T | undefined;
  onChange: (v: T) => void;
  render: (v: T) => ReactNode;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = o === value;
        return (
          <button
            key={String(o)}
            type="button"
            onClick={() => onChange(o)}
            className={`px-3.5 py-2 font-sans text-sm transition-colors ${
              on ? "bg-[#180E06] text-[#FDF7EC]" : "bg-[#180E06]/[0.06] text-[#180E06]/75 hover:bg-[#180E06]/[0.1]"
            }`}
          >
            {render(o)}
          </button>
        );
      })}
    </div>
  );
}
