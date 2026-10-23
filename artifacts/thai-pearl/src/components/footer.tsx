import logo from "@assets/thai-pearl/logo.png";
import { Link } from "wouter";
import { useState, type FormEvent } from "react";
import { sendRequest } from "@/lib/requests";

const LINKS: [string, string][] = [
  ["Menu", "/menu"],
  ["Meal prep", "/meal-prep"],
  ["Events and specials", "/events"],
  ["Reservations", "/reserve"],
  ["Catering", "/catering"],
  ["Private parties", "/parties"],
  ["Press and reviews", "/press"],
  ["Jobs", "/jobs"],
];

export function Footer() {
  return (
    <footer className="bg-[#100907] text-white border-t border-[#E8920E]/12">
      <div className="container mx-auto px-6 md:px-16 py-14 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12">
        <Newsletter />
        <nav className="grid grid-cols-2 gap-x-6 gap-y-1 content-start" aria-label="Footer">
          {LINKS.map(([label, href]) => (
            <Link key={href} href={href} className="font-sans text-[15px] text-white/55 hover:text-[#E8920E] transition-colors py-2">
              {label}
            </Link>
          ))}
          <a href="https://instagram.com/thaipearl_restaurant" target="_blank" rel="noopener noreferrer" className="font-sans text-[15px] text-white/55 hover:text-[#E8920E] transition-colors py-2">
            Instagram
          </a>
          <a href="https://www.facebook.com/109076393998386" target="_blank" rel="noopener noreferrer" className="font-sans text-[15px] text-white/55 hover:text-[#E8920E] transition-colors py-2">
            Facebook
          </a>
        </nav>
      </div>
      <div className="border-t border-white/8">
        <div className="container mx-auto px-6 md:px-16 py-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <img
            src={logo}
            alt="Thai Pearl"
            className="h-12 w-auto object-contain cursor-pointer opacity-90 hover:opacity-100 transition-opacity"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
          <p className="font-sans text-white/30 text-xs text-center md:text-right leading-relaxed">
            &copy; {new Date().getFullYear()} Thai Pearl &middot; 747 Haywood Rd, Asheville, NC 28806
          </p>
        </div>
      </div>
    </footer>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const [error, setError] = useState("");
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError("Please add a real email address.");
    setState("busy");
    setError("");
    try {
      await sendRequest({ kind: "newsletter", email: email.trim() });
      setState("done");
    } catch (err) {
      setError((err as Error).message);
      setState("idle");
    }
  };
  return (
    <div>
      <p className="font-serif text-3xl md:text-4xl leading-tight" style={{ fontWeight: 500 }}>
        Specials and events,
        <br />
        <em className="text-[#E8920E]">straight to your inbox.</em>
      </p>
      {state === "done" ? (
        <p className="font-sans text-white/70 mt-6">You're on the list. Talk soon.</p>
      ) : (
        <form onSubmit={submit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md" noValidate>
          <label className="sr-only" htmlFor="nl-email">Email</label>
          <input
            id="nl-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 min-w-0 bg-white/8 border border-white/15 rounded-lg px-4 py-3.5 font-sans text-base text-white placeholder:text-white/30 outline-none focus:border-[#E8920E]"
          />
          <button disabled={state === "busy"} className="bg-[#E8920E] hover:bg-[#c87a0c] text-[#180E06] rounded-lg px-6 py-3.5 font-sans font-bold transition-colors disabled:opacity-60">
            {state === "busy" ? "Joining..." : "Join"}
          </button>
        </form>
      )}
      {error && <p className="font-sans text-sm text-[#E8920E] mt-3">{error}</p>}
      <p className="font-sans text-xs text-white/30 mt-3">A few emails a month. Unsubscribe any time.</p>
    </div>
  );
}
