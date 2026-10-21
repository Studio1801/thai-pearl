import { motion } from "framer-motion";
import { Link } from "wouter";
import { formatTime, money } from "@shared/model";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { lineDetail } from "@/components/order/bag";
import { useOrderStatus, useSite } from "@/lib/live";

const STEPS = [
  { key: "new", label: "Received", thai: "ได้รับแล้ว", line: "The kitchen has your order." },
  { key: "cooking", label: "In the wok", thai: "กำลังทำ", line: "Chef's cooking it now." },
  { key: "ready", label: "Ready", thai: "พร้อมแล้ว", line: "Come on in, it's waiting at the counter." },
  { key: "done", label: "Picked up", thai: "รับแล้ว", line: "Enjoy. Thank you for ordering direct." },
] as const;

export default function OrderStatusPage({ params }: { params: { id: string } }) {
  const site = useSite();
  const { data: order, isError, isLoading } = useOrderStatus(params.id);
  const tel = `tel:${site.phone.replace(/\D/g, "")}`;
  const stepIndex = order ? STEPS.findIndex((s) => s.key === order.status) : -1;

  return (
    <div className="bg-[#FDF7EC] min-h-screen font-sans">
      <Navbar />
      <div className="bg-[#180E06] thai-pattern-dark pt-36 pb-14 px-8">
        <div className="max-w-2xl mx-auto">
          {order ? (
            <>
              <p className="font-sans text-[#E8920E] text-sm">Thanks, {order.firstName}.</p>
              <h1 className="font-serif text-white leading-none mt-3" style={{ fontSize: "clamp(3rem, 9vw, 5.5rem)", fontWeight: 500 }}>
                Order no. {order.number}
              </h1>
              <p className="font-sans text-white/55 text-sm mt-4">
                {order.status === "cancelled"
                  ? "This order was cancelled. Give us a call if that's a surprise."
                  : `Pickup ${order.asap ? "around" : "at"} ${formatTime(order.pickupAt)} at 747 Haywood Rd. Pay when you pick up.`}
              </p>
            </>
          ) : (
            <h1 className="font-serif text-white text-4xl" style={{ fontWeight: 500 }}>
              {isLoading ? "Finding your order..." : "We couldn't find that order"}
            </h1>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-8 py-12">
        {order && order.status !== "cancelled" && (
          <ol className="space-y-0">
            {STEPS.map((s, i) => {
              const reached = i <= stepIndex;
              const current = i === stepIndex;
              return (
                <li key={s.key} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <motion.span
                      animate={current ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                      transition={current ? { duration: 1.8, repeat: Infinity } : {}}
                      className={`mt-1.5 w-3.5 h-3.5 rounded-full ${reached ? "bg-[#C4281A]" : "bg-[#180E06]/15"}`}
                    />
                    {i < STEPS.length - 1 && <span className={`w-px flex-1 my-1 ${i < stepIndex ? "bg-[#C4281A]" : "bg-[#180E06]/15"}`} />}
                  </div>
                  <div className="pb-8">
                    <p className={`font-serif text-2xl leading-none ${reached ? "text-[#180E06]" : "text-[#180E06]/30"}`} style={{ fontWeight: 500 }}>
                      {s.label}{" "}
                      <span className="text-base text-[#C4281A]/45" style={{ fontWeight: 400 }}>
                        {s.thai}
                      </span>
                    </p>
                    {current && <p className="font-sans text-sm text-[#7A6A60] mt-2">{s.line}</p>}
                  </div>
                </li>
              );
            })}
          </ol>
        )}

        {order && (
          <div className="mt-4 border-t-2 border-[#180E06] pt-5">
            <ul className="divide-y divide-[#E8DCC8]">
              {order.lines.map((l, i) => (
                <li key={i} className="py-3 flex justify-between gap-6">
                  <div>
                    <p className="font-sans font-semibold text-sm text-[#180E06]">
                      {l.qty} &times; {l.name}
                    </p>
                    {lineDetail(l) && <p className="font-sans text-xs text-[#8A7060] mt-0.5">{lineDetail(l)}</p>}
                  </div>
                  <p className="font-serif text-[#C4281A]" style={{ fontWeight: 500 }}>
                    {money(l.unit * l.qty)}
                  </p>
                </li>
              ))}
            </ul>
            <p className="flex justify-between font-sans text-sm pt-4 border-t border-[#E8DCC8]">
              <span className="text-[#8A7060]">Before tax</span>
              <span className="font-serif text-lg text-[#180E06]" style={{ fontWeight: 600 }}>
                {money(order.subtotal)}
              </span>
            </p>
          </div>
        )}

        {(isError || order) && (
          <p className="mt-10 font-sans text-sm text-[#7A6A60]">
            Need to change something?{" "}
            <a href={tel} className="text-[#180E06] underline underline-offset-2 font-semibold">
              Call {site.phone}
            </a>{" "}
            or{" "}
            <Link href="/menu" className="text-[#180E06] underline underline-offset-2">
              start another order
            </Link>
            .
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}
