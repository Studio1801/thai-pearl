import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import logo from "@assets/thai-pearl/logo.png";
import { hoursSummary, liveStatus } from "@shared/model";
import { useNow, useSite } from "@/lib/live";

type Msg = { from: "guest" | "owner" | "auto"; text: string; at: string; link?: { href: string; label: string } };

const THREAD = "tp-chat-thread";
const SEEN = "tp-chat-seen";
const ME = "tp-chat-me";
const get = (k: string) => {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
};
const put = (k: string, v: string) => {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* private mode */
  }
};

const ease = [0.16, 1, 0.3, 1] as const;

/** Floating chat: instant answers from the live site data, and real messages to the kitchen. */
export function Chat() {
  const [location] = useLocation();
  const site = useSite();
  const now = useNow();
  const status = liveStatus(site, now);
  const [open, setOpen] = useState(false);
  const [thread, setThread] = useState<string | null>(() => get(THREAD));
  const [server, setServer] = useState<Msg[]>([]);
  const [local, setLocal] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState("");
  const [me, setMe] = useState<{ name: string; phone: string }>(() => {
    try {
      return JSON.parse(get(ME) ?? "") as { name: string; phone: string };
    } catch {
      return { name: "", phone: "" };
    }
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [seen, setSeen] = useState(() => Number(get(SEEN) ?? 0));
  const list = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);

  // poll the conversation: often while open, slowly while closed (for the unread dot)
  useEffect(() => {
    if (!thread) return;
    let stop = false;
    const pull = async () => {
      try {
        const res = await fetch(`/api/chat?thread=${thread}`, { cache: "no-store" });
        if (res.ok && !stop) setServer(((await res.json()).msgs ?? []) as Msg[]);
      } catch {
        /* offline for a moment */
      }
    };
    pull();
    const t = setInterval(pull, open ? 3000 : 12000);
    return () => {
      stop = true;
      clearInterval(t);
    };
  }, [thread, open]);

  const replies = server.filter((m) => m.from === "owner").length;
  const unread = open ? 0 : Math.max(0, replies - seen);
  useEffect(() => {
    if (open && replies !== seen) {
      setSeen(replies);
      put(SEEN, String(replies));
    }
  }, [open, replies, seen]);

  const msgs = [...server.map((m) => ({ ...m })), ...local].sort((a, b) => a.at.localeCompare(b.at));
  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight, behavior: "smooth" });
  }, [msgs.length, typing, open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (location.startsWith("/dashboard")) return null;

  const hours = hoursSummary(site.hours).map((g) => `${g.label}, ${g.value}`).join(". ");
  const answers: { q: string; a: string; link?: { href: string; label: string }; keys: RegExp }[] = [
    { q: "Are you open?", a: `${status.label}. Hours: ${hours}.`, keys: /\b(open|close|hour|today|tonight|time)\b/i },
    { q: "Book a table", a: "Pick a day and time and we'll text you to confirm.", link: { href: "/reserve", label: "Book a table" }, keys: /\b(book|reserv|table)/i },
    { q: "Vegan or gluten free?", a: "Yes. Lots of dishes are vegan or can be made vegan, and many are gluten free. Look for V and GF on the menu, and put allergies in your order note.", link: { href: "/menu", label: "See the menu" }, keys: /\b(vegan|vegetarian|gluten|gf|allerg|peanut|celiac)/i },
    { q: "Order pickup", a: `Order right here and pick it up in about ${site.ordering.prepMinutes} minutes. Pay when you pick up.`, link: { href: "/menu", label: "Start an order" }, keys: /\b(order|pickup|pick up|takeout|to go)\b/i },
    { q: "Catering or a party", a: "We cater up to 100 guests and host parties in the dining room. Send the details and we'll get back within a day.", link: { href: "/catering", label: "Plan it" }, keys: /\b(cater|party|parties|event|group|wedding|office)/i },
    { q: "Where are you?", a: "747 Haywood Rd in West Asheville. Dogs are welcome on the patio.", link: { href: "https://maps.google.com/?q=Thai+Pearl+747+Haywood+Rd+Asheville", label: "Directions" }, keys: /\b(where|address|located|direction|park|dog)/i },
    { q: "Meal prep", a: "3, 5 or 10 high protein meals, built your way, delivered Monday, Wednesday and Sunday.", link: { href: "/meal-prep", label: "Build my meals" }, keys: /\b(meal prep|mealprep|protein|weekly)/i },
  ];

  const stamp = () => new Date().toISOString();
  const autoReply = (a: (typeof answers)[number], delay = 650) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setLocal((l) => [...l, { from: "auto", text: a.a, at: stamp(), link: a.link }]);
    }, delay);
  };

  const ask = (a: (typeof answers)[number]) => {
    setLocal((l) => [...l, { from: "guest", text: a.q, at: stamp() }]);
    autoReply(a);
  };

  const send = async (e?: FormEvent) => {
    e?.preventDefault();
    const body = text.trim();
    if (!body) return;
    if (!thread && me.name.trim().length < 2) {
      setError("Add your name so we know who's asking.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ thread, text: body, name: me.name.trim(), phone: me.phone.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "That didn't send. Try again or call us.");
      if (!thread) {
        setThread(data.id);
        put(THREAD, data.id);
        put(ME, JSON.stringify(me));
      }
      setServer(data.msgs ?? []);
      setText("");
      const hit = answers.find((a) => a.keys.test(body));
      if (hit) autoReply({ ...hit, a: `${hit.a} The team has your message too.` }, 800);
      else if (server.filter((m) => m.from === "guest").length === 0)
        autoReply({ ...answers[0], a: status.openNow ? "Got it. Someone from the kitchen will reply here in a few minutes." : `Got it. We're closed right now, so we'll reply when we open. ${status.label}.`, link: undefined }, 800);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const welcome: Msg = {
    from: "auto",
    text: `Hi! Ask us anything, or tap a question below. ${status.openNow ? "The kitchen is in, so a real person will reply." : "We're closed right now, but we'll reply when we open."}`,
    at: "",
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => {
          setOpen((o) => !o);
          setTimeout(() => input.current?.focus(), 350);
        }}
        aria-label={open ? "Close chat" : "Chat with Thai Pearl"}
        aria-expanded={open}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 380, damping: 22 }}
        whileTap={{ scale: 0.92 }}
        className={`chat-fab fixed right-4 md:right-7 z-[70] w-14 h-14 rounded-full bg-[#180E06] text-white grid place-items-center shadow-[0_12px_32px_-8px_rgba(24,14,6,0.55)] ring-1 ring-white/10 ${open ? "max-md:hidden" : ""}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </motion.svg>
          ) : (
            <motion.svg key="c" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
              <path d="M4 5.5A2.5 2.5 0 016.5 3h11A2.5 2.5 0 0120 5.5v8a2.5 2.5 0 01-2.5 2.5H10l-4.5 4v-4h0A1.5 1.5 0 014 14.5z" />
            </motion.svg>
          )}
        </AnimatePresence>
        {unread > 0 && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-[#E8920E] text-[#180E06] text-xs font-bold grid place-items-center">
            {unread}
          </motion.span>
        )}
        {!open && status.openNow && <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-[#3FBF8F] ring-2 ring-[#180E06]" aria-hidden />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-label="Chat with Thai Pearl"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.42, ease }}
            style={{ transformOrigin: "bottom right" }}
            className="chat-panel fixed z-[69] inset-x-0 bottom-0 md:inset-x-auto md:right-7 md:w-[392px] h-[min(86dvh,640px)] md:h-[min(78vh,620px)] bg-[#FDF7EC] text-[#180E06] rounded-t-[22px] md:rounded-[22px] shadow-[0_30px_80px_-20px_rgba(24,14,6,0.55)] ring-1 ring-black/5 flex flex-col overflow-hidden"
          >
            <header className="bg-[#180E06] text-white px-5 pt-5 pb-4 flex items-center gap-3 flex-shrink-0">
              <img src={logo} alt="" className="w-10 h-10 object-contain" />
              <div className="flex-1 min-w-0">
                <p className="font-serif text-xl leading-tight" style={{ fontWeight: 500 }}>Thai Pearl</p>
                <p className="font-sans text-xs text-white/55 flex items-center gap-1.5 mt-0.5">
                  <span className={`w-2 h-2 rounded-full ${status.openNow ? "bg-[#3FBF8F]" : "bg-white/30"}`} />
                  {status.openNow ? "In the kitchen now, replies in a few minutes" : status.label}
                </p>
              </div>
              <button onClick={() => setOpen(false)} className="md:hidden w-10 h-10 grid place-items-center rounded-full bg-white/10" aria-label="Close chat">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </header>

            <div ref={list} className="flex-1 overflow-y-auto px-4 py-5 space-y-2.5 overscroll-contain">
              <Bubble m={welcome} />
              {msgs.map((m, i) => (
                <Bubble key={i + m.at} m={m} onNav={() => setOpen(false)} />
              ))}
              {typing && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex gap-1 bg-white rounded-2xl rounded-bl-md px-4 py-3.5 w-fit shadow-sm" aria-label="Typing">
                  {[0, 1, 2].map((d) => (
                    <motion.span key={d} className="w-1.5 h-1.5 rounded-full bg-[#8A7060]" animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }} />
                  ))}
                </motion.div>
              )}
            </div>

            <div className="flex-shrink-0 border-t border-[#E8DCC8] bg-[#FDF7EC]">
              <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 pt-3">
                {answers.map((a) => (
                  <motion.button
                    key={a.q}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => ask(a)}
                    className="flex-shrink-0 rounded-full bg-white border border-[#E2D3BC] hover:border-[#180E06]/40 px-3.5 py-2 font-sans text-sm transition-colors"
                  >
                    {a.q}
                  </motion.button>
                ))}
              </div>
              {!thread && (
                <div className="grid grid-cols-2 gap-2 px-4 pt-3">
                  <input value={me.name} onChange={(e) => setMe({ ...me, name: e.target.value })} placeholder="Your name" autoComplete="name" className="chat-in" aria-label="Your name" />
                  <input value={me.phone} onChange={(e) => setMe({ ...me, phone: e.target.value })} placeholder="Phone, optional" inputMode="tel" autoComplete="tel" className="chat-in" aria-label="Phone, optional" />
                </div>
              )}
              {error && <p className="px-4 pt-2 font-sans text-sm text-[#9E1F13]">{error}</p>}
              <form onSubmit={send} className="flex items-end gap-2 p-3 pt-2.5" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
                <textarea
                  ref={input}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  rows={1}
                  placeholder="Message the kitchen"
                  aria-label="Message"
                  className="chat-in flex-1 resize-none max-h-28"
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  disabled={busy || !text.trim()}
                  className="w-12 h-12 flex-shrink-0 rounded-full bg-[#C4281A] disabled:bg-[#C4281A]/35 text-white grid place-items-center transition-colors"
                  aria-label="Send"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </motion.button>
              </form>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({ m, onNav }: { m: Msg; onNav?: () => void }) {
  const mine = m.from === "guest";
  const owner = m.from === "owner";
  const body: ReactNode = (
    <>
      {owner && <span className="block text-[11px] font-semibold text-[#C4281A] mb-0.5">Thai Pearl kitchen</span>}
      {m.text}
      {m.link &&
        (m.link.href.startsWith("http") ? (
          <a href={m.link.href} target="_blank" rel="noopener noreferrer" className="chat-link">
            {m.link.label}
          </a>
        ) : (
          <Link href={m.link.href} onClick={onNav} className="chat-link">
            {m.link.label}
          </Link>
        ))}
    </>
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease }}
      className={`flex ${mine ? "justify-end" : "justify-start"}`}
    >
      <p
        className={`max-w-[85%] whitespace-pre-wrap font-sans text-[15px] leading-snug px-4 py-2.5 rounded-2xl shadow-sm ${
          mine ? "bg-[#180E06] text-white rounded-br-md" : owner ? "bg-white ring-1 ring-[#C4281A]/20 rounded-bl-md" : "bg-white rounded-bl-md"
        }`}
      >
        {body}
      </p>
    </motion.div>
  );
}
