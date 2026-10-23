import Link from "next/link";
import type { ReactNode } from "react";
import { ScrollVar } from "@/shared/components/scroll-var";
import { Icon, icons, ORG, pill, SiteFooter, SiteHeader } from "@/shared/components/site-chrome";

// ponytail: event details are hardcoded for the Ad On party; read from the DB if the home page ever serves many groups
const EVENT = { org: ORG, eyebrow: "Adon", year: 2026, date: "18 December 2026", people: 24, budget: "$25–$40", short: "18 DEC" };

// Drop illustrated art into public/santa/ with these names; until then the CSS fallback shows.
const art = (name: string) => ({ backgroundImage: `url(/santa/${name})` });




function Badge({ icon, value, label }: { icon: string; value: ReactNode; label: string }) {
  return (
    <div className="relative grid size-30 place-items-center text-center md:size-36">
      <svg viewBox="-4 -4 108 108" className="absolute inset-0 size-full drop-shadow-[0_10px_28px_rgba(0,0,0,0.6)]" aria-hidden>
        {/* Scalloped shape drawn twice: a slightly larger light copy forms the rim */}
        {[{ grow: 2, fill: "rgba(255,255,255,0.35)" }, { grow: 0, fill: "#060d2b" }].map(({ grow, fill }) => (
          <g key={fill} fill={fill}>
            {Array.from({ length: 12 }, (_, i) => {
              const a = (i / 12) * Math.PI * 2;
              return <circle key={i} cx={50 + 38 * Math.cos(a)} cy={50 + 38 * Math.sin(a)} r={12 + grow} />;
            })}
            <circle cx={50} cy={50} r={40 + grow} />
          </g>
        ))}
      </svg>
      <div className="relative">
        <Icon d={icon} className="mx-auto size-5 text-gold" />
        <p className="mt-1 text-xl font-bold leading-none md:text-2xl">{value}</p>
        <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wider text-ink/90 md:text-[11px]">{label}</p>
      </div>
    </div>
  );
}

const steps = [
  { tag: "The draw", tone: "bg-mint/30 text-[#0f6b63]", line: "bg-mint", title: "Draw Names", text: "Get matched with a teammate and start the festive fun.", img: "card-draw.jpg", icon: icons.people },
  { tag: "Your wishlist", tone: "bg-ember text-white", line: "bg-ember", title: "Build a Wishlist", text: "Share what you'd love to receive (or just hint a little).", img: "card-wishlist.jpg", icon: icons.list },
  { tag: "Keep it secret", tone: "bg-mint/30 text-[#0f6b63]", line: "bg-mint", title: "Keep it Secret", text: "The surprise is part of the magic. Your identity stays hidden.", img: "card-secret.jpg", icon: icons.gift },
  { tag: "Spread the joy", tone: "bg-ember text-white", line: "bg-ember", title: "Share the Joy", text: "Exchange gifts, share smiles and celebrate as a team.", img: "card-joy.jpg", icon: icons.gift },
];

function Hills({ className, fill }: { className: string; fill: string }) {
  return (
    <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className={className} aria-hidden>
      <path fill={fill} d="M0 90 C120 30 240 30 360 80 S600 140 720 90 960 20 1080 70 1320 130 1440 70 V160 H0Z" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-[100dvh] overflow-x-clip bg-[#010f39] text-ink">
      <section id="top" className="night-sky relative isolate min-h-[min(60rem,100dvh)] pb-48">
        <ScrollVar />
        <div className="parallax-far absolute inset-0 -z-10 bg-cover bg-bottom" style={art("hero.png")} />


        <SiteHeader active="/" />

        <div className="parallax-mid">
        <div className="enter mx-auto max-w-3xl px-4 pt-14 text-center md:pt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.35em]">{EVENT.eyebrow} Secret Santa {EVENT.year}</p>
          <h1 className="mt-6 font-fancy! text-[clamp(2.75rem,8vw,5.75rem)] font-bold! leading-[1.02] tracking-normal! [text-shadow:0_6px_30px_rgba(5,10,40,0.5)]">
            A Little Gift, A Lot of Togetherness
          </h1>
          <p className="mt-8 text-lg font-medium">{EVENT.date} · Team celebration</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 md:gap-8">
            <Badge icon={icons.people} value={EVENT.people} label="Teammates" />
            <Badge icon={icons.gift} value={EVENT.budget} label="Gift budget" />
            <Badge icon={icons.calendar} value={EVENT.short} label="Exchange" />
          </div>
        </div>
        </div>
      </section>

      <div className="relative bg-[#010f39]">
      <div aria-hidden className="parallax-near pointer-events-none absolute inset-x-0 -top-[8.67vw] h-[calc(8.67vw+18rem)]" />
      <section id="how" className="relative mx-auto max-w-[1100px] scroll-mt-6 px-4 pt-12 pb-16 text-center md:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em]"><span className="text-gold">✦</span> The season of <span className="text-gold">✦</span></p>
        <h2 className="mt-3 font-fancy! text-[clamp(2.75rem,7vw,4.5rem)] font-bold! leading-none tracking-normal!">Giving</h2>
        <p className="mx-auto mt-6 max-w-[60ch] text-[15px] leading-relaxed text-ink/85">
          One team, one festive tradition, countless reasons to smile.
        </p>

        <div className="rise-in mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <article key={s.title} className="overflow-hidden rounded-2xl bg-white text-[#13224a] shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
              <div className="relative grid h-44 place-items-center bg-[linear-gradient(160deg,#1f5ea3,#0f2a5e)] text-gold">
                <Icon d={s.icon} className="size-14 opacity-70" />
                <div className="absolute inset-0 bg-cover bg-center" style={art(s.img)} />
                <Hills className="absolute inset-x-0 -bottom-px h-6 w-full" fill="#ffffff" />
              </div>
              <div className="px-5 pt-3 pb-6">
                <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${s.tone}`}>{s.tag}</span>
                <h3 className="mt-3 text-xl font-semibold! tracking-[-0.02em]">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-[22ch] text-sm leading-relaxed text-[#4a587a]">{s.text}</p>
                <span className={`mx-auto mt-4 block h-0.5 w-5 rounded ${s.line}`} />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link href="/recover" className={`${pill} bg-ember text-white`}>
            <Icon d={icons.gift} /> Reveal My Match <Icon d={icons.arrow} className="size-4" />
          </Link>
          <Link href="/create" className={`${pill} bg-mint text-[#0a1433]`}>
            <Icon d={icons.list} /> Start a Party <Icon d={icons.arrow} className="size-4" />
          </Link>
        </div>
      </section>
      </div>

      <SiteFooter />
    </div>
  );
}
