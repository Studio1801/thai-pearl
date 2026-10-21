import { AnimatePresence, motion } from "framer-motion";
import { createContext, useCallback, useContext, useState, type ButtonHTMLAttributes, type ReactNode } from "react";

export const C = {
  paper: "#F6EFE3",
  chit: "#FFFCF6",
  ink: "#180E06",
  crimson: "#C4281A",
  saffron: "#E8920E",
  jade: "#0F7A6B",
  muted: "#8A7060",
  line: "#E4D7C3",
};

export function Switch({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className="relative w-12 h-7 rounded-full transition-colors flex-shrink-0"
      style={{ background: on ? C.jade : "#CDBFAA" }}
    >
      <motion.span
        className="absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-sm"
        animate={{ x: on ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
      />
    </button>
  );
}

type Tone = "crimson" | "ink" | "jade" | "quiet";

export function Btn({ tone = "crimson", className = "", ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { tone?: Tone }) {
  const tones: Record<Tone, string> = {
    crimson: "bg-[#C4281A] hover:bg-[#a42016] text-white",
    ink: "bg-[#180E06] hover:bg-[#2d1d10] text-[#FDF7EC]",
    jade: "bg-[#0F7A6B] hover:bg-[#0c6458] text-white",
    quiet: "bg-[#180E06]/[0.07] hover:bg-[#180E06]/[0.12] text-[#180E06]",
  };
  return (
    <button
      {...rest}
      className={`rounded-md font-sans font-semibold text-sm px-4 py-3 transition-colors disabled:opacity-40 ${tones[tone]} ${className}`}
    />
  );
}

export function Chips<T extends string | number>({
  options,
  value,
  onChange,
  render,
}: {
  options: T[];
  value?: T;
  onChange: (v: T) => void;
  render: (v: T) => ReactNode;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={String(o)}
          type="button"
          onClick={() => onChange(o)}
          className={`rounded-md px-3.5 py-2 font-sans text-sm transition-colors ${
            o === value ? "bg-[#180E06] text-[#FDF7EC]" : "bg-[#180E06]/[0.07] hover:bg-[#180E06]/[0.12] text-[#180E06]"
          }`}
        >
          {render(o)}
        </button>
      ))}
    </div>
  );
}

export function TextField({
  label,
  value,
  onChange,
  multiline,
  ...rest
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
} & Record<string, unknown>) {
  const cls =
    "mt-1.5 w-full rounded-md bg-white border border-[#E4D7C3] focus:border-[#180E06] outline-none px-3 py-2.5 font-sans text-[15px] text-[#180E06]";
  return (
    <label className="block">
      <span className="font-sans text-xs font-semibold text-[#8A7060]">{label}</span>
      {multiline ? (
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} className={cls} {...rest} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={cls} {...rest} />
      )}
    </label>
  );
}

/* ---------- toasts: tiny confirmation that a change is live ---------- */

const ToastCtx = createContext<(msg: string, bad?: boolean) => void>(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastHost({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ id: number; msg: string; bad?: boolean } | null>(null);
  const show = useCallback((msg: string, bad?: boolean) => {
    const id = Date.now();
    setToast({ id, msg, bad });
    setTimeout(() => setToast((t) => (t?.id === id ? null : t)), 2600);
  }, []);
  return (
    <ToastCtx.Provider value={show}>
      {children}
      <div className="fixed bottom-5 inset-x-0 flex justify-center z-[80] pointer-events-none px-4">
        <AnimatePresence>
          {toast && (
            <motion.p
              key={toast.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              className={`rounded-full px-5 py-3 font-sans text-sm shadow-lg ${toast.bad ? "bg-[#C4281A] text-white" : "bg-[#180E06] text-[#FDF7EC]"}`}
            >
              {toast.msg}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  );
}

export function SectionTitle({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-4">
      <h2 className="font-serif text-2xl text-[#180E06]" style={{ fontWeight: 500 }}>
        {title}
      </h2>
      {hint && <p className="font-sans text-sm text-[#8A7060] mt-1 max-w-prose">{hint}</p>}
    </div>
  );
}
