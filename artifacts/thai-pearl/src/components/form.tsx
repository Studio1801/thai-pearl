import { AnimatePresence, motion } from "framer-motion";
import { useId, useState, type FormEvent, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";
import { sendRequest, type RequestPayload } from "@/lib/requests";

export const inputCls =
  "w-full bg-white border border-[#E2D3BC] rounded-lg px-4 py-3.5 font-sans text-base text-[#180E06] placeholder:text-[#B3A190] outline-none focus:border-[#180E06] transition-colors";

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block font-sans text-sm font-semibold text-[#180E06] mb-2">
        {label}
        {hint && <span className="font-normal text-[#8A7060] ml-2">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

export const Input = (p: InputHTMLAttributes<HTMLInputElement>) => <input {...p} className={`${inputCls} ${p.className ?? ""}`} />;
export const TextArea = (p: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea rows={3} {...p} className={`${inputCls} resize-none ${p.className ?? ""}`} />
);

/** A row of choices where exactly one is picked. */
export function Choice<T extends string | number>({
  options,
  value,
  onChange,
  render,
  sub,
  cols,
}: {
  options: T[];
  value: NoInfer<T> | undefined;
  onChange: (v: NoInfer<T>) => void;
  render?: (v: NoInfer<T>) => ReactNode;
  sub?: (v: NoInfer<T>) => ReactNode;
  cols?: string;
}) {
  const group = useId();
  return (
    <div className={cols ?? "flex flex-wrap gap-2"}>
      {options.map((o) => {
        const on = o === value;
        return (
          <motion.button
            type="button"
            key={String(o)}
            onClick={() => onChange(o)}
            aria-pressed={on}
            whileTap={{ scale: 0.96 }}
            className={`relative isolate rounded-lg px-4 py-3 min-h-[48px] font-sans text-[15px] text-left transition-colors duration-300 border ${
              on ? "text-white border-transparent" : "bg-white text-[#180E06] border-[#E2D3BC] hover:border-[#180E06]/45"
            }`}
          >
            {on && (
              <motion.span
                layoutId={group}
                className="absolute inset-0 -z-10 bg-[#180E06] rounded-lg shadow-[0_10px_24px_-12px_rgba(24,14,6,0.7)]"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="font-semibold">{render ? render(o) : String(o)}</span>
            {sub && <span className={`block text-xs mt-0.5 transition-colors ${on ? "text-white/60" : "text-[#8A7060]"}`}>{sub(o)}</span>}
          </motion.button>
        );
      })}
    </div>
  );
}

export function Stepper({ value, onChange, min = 1, max = 99, label }: { value: number; onChange: (v: number) => void; min?: number; max?: number; label: string }) {
  const btn = "w-12 h-12 rounded-full bg-white border border-[#E2D3BC] text-xl font-sans hover:border-[#180E06] hover:bg-[#180E06] hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-[#180E06] transition-colors";
  return (
    <div className="flex items-center gap-4" role="group" aria-label={label}>
      <button type="button" className={btn} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`Fewer ${label}`}>
        &minus;
      </button>
      <span className="font-serif text-3xl w-12 text-center tabular-nums overflow-hidden h-10 relative" style={{ fontWeight: 500 }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={value} className="block" initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -18, opacity: 0 }} transition={{ type: "spring", stiffness: 500, damping: 34 }}>
            {value}
          </motion.span>
        </AnimatePresence>
      </span>
      <button type="button" className={btn} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={`More ${label}`}>
        +
      </button>
    </div>
  );
}

/** Wraps a form: sends it, shows the error, then swaps to a thank-you card. */
export function RequestForm({
  build,
  children,
  submit,
  done,
  className = "",
}: {
  build: () => RequestPayload | string;
  children: ReactNode;
  submit: string;
  done: (payload: RequestPayload) => ReactNode;
  className?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState<RequestPayload | null>(null);
  const [trap, setTrap] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const p = build();
    if (typeof p === "string") return setError(p);
    setBusy(true);
    setError("");
    try {
      await sendRequest({ ...p, company: trap });
      setSent(p);
      window.scrollTo({ top: Math.max(0, (e.target as HTMLElement).getBoundingClientRect().top + window.scrollY - 120), behavior: "smooth" });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#180E06] thai-pattern-dark grain overflow-hidden text-white rounded-lg p-8 md:p-12"
        >
          <motion.div
            className="w-14 h-14 rounded-full bg-[#0F7A6B] grid place-items-center mb-7 shadow-[0_0_0_10px_rgba(15,122,107,0.15)]"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
            aria-hidden
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }} />
            </svg>
          </motion.div>
          {done(sent)}
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={onSubmit} exit={{ opacity: 0, y: -8 }} className={className} noValidate>
          {children}
          <input
            tabIndex={-1}
            autoComplete="off"
            value={trap}
            onChange={(e) => setTrap(e.target.value)}
            name="company"
            aria-hidden
            className="absolute -left-[9999px] w-px h-px opacity-0"
          />
          {error && (
            <motion.p
              key={error}
              role="alert"
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: [0, -8, 7, -4, 2, 0], opacity: 1 }}
              transition={{ duration: 0.45 }}
              className="mt-6 bg-[#C4281A]/10 text-[#9E1F13] rounded-lg px-4 py-3 font-sans text-sm font-semibold"
            >
              {error}
            </motion.p>
          )}
          <button
            disabled={busy}
            className="group mt-8 w-full sm:w-auto bg-[#C4281A] hover:bg-[#a42016] disabled:opacity-70 text-white rounded-lg px-10 py-4 min-h-[56px] font-sans font-bold text-base inline-flex items-center justify-center gap-3"
          >
            {busy ? (
              <>
                <motion.span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                Sending
              </>
            ) : (
              <>
                {submit}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </>
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export function DoneText({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <h2 className="font-serif text-3xl md:text-4xl leading-tight" style={{ fontWeight: 500 }}>
        {title}
      </h2>
      <div className="font-sans text-white/65 text-base leading-relaxed mt-4 max-w-xl space-y-3">{children}</div>
    </>
  );
}

export function ContactFields({ v, set, email = "optional" }: { v: { name: string; phone: string; email: string }; set: (k: "name" | "phone" | "email", val: string) => void; email?: "optional" | "required" | "none" }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Your name">
        <Input value={v.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" placeholder="First and last name" />
      </Field>
      <Field label="Phone" hint="we text to confirm">
        <Input value={v.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" inputMode="tel" placeholder="(828) 555-0123" />
      </Field>
      {email !== "none" && (
        <div className="sm:col-span-2">
          <Field label="Email" hint={email === "optional" ? "optional" : undefined}>
            <Input value={v.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" inputMode="email" type="email" placeholder="you@example.com" />
          </Field>
        </div>
      )}
    </div>
  );
}

export function useContact() {
  const [v, setV] = useState({ name: "", phone: "", email: "" });
  const set = (k: "name" | "phone" | "email", val: string) => setV((x) => ({ ...x, [k]: val }));
  return { v, set };
}

export function checkContact(v: { name: string; phone: string; email: string }, emailRequired = false): string | null {
  if (v.name.trim().length < 2) return "Please add your name.";
  if (v.phone.replace(/\D/g, "").length < 10) return "Please add a phone number we can text or call.";
  if (emailRequired && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) return "Please add your email.";
  if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) return "That email address doesn't look right.";
  return null;
}

export function Section({ title, sub, children, className = "" }: { title: string; sub?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`mt-12 first:mt-0 ${className}`}>
      <h2 className="font-serif text-2xl md:text-3xl leading-tight" style={{ fontWeight: 500 }}>
        {title}
      </h2>
      {sub && <p className="font-sans text-[#8A7060] text-sm mt-1.5">{sub}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}
