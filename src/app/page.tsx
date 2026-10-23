import Image from "next/image";
import Link from "next/link";
import { ghostButtonClass, inkButtonClass, PageShell } from "@/shared/components/page-shell";

export default function HomePage() {
  return (
    <PageShell flush>
      <section className="enter mx-auto grid w-full max-w-[1199px] items-start gap-10 px-4 pt-12 pb-16 md:grid-cols-[1.15fr_0.85fr] md:px-8 md:pt-20 md:pb-24">
        <div>
          <h1 className="max-w-[10ch] text-[clamp(3.25rem,7vw,5.25rem)] leading-[0.95] tracking-[-0.05em]">
            Draw names.
          </h1>
          <p className="mt-5 max-w-[34ch] text-lg leading-[1.3] tracking-[-0.01em] text-mute">
            Each guest gets one private page. You hold the manage link.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/create" className={inkButtonClass}>
              Create party
            </Link>
            <Link href="/recover" className={ghostButtonClass}>
              Send links
            </Link>
          </div>
        </div>
        <div className="rounded-[20px] bg-surface p-4">
          <div className="relative h-64 overflow-hidden rounded-[15px] md:h-[min(26rem,calc(100dvh-10rem))]">
            <Image
              src="/hero-gifts.jpg"
              alt="Wrapped gifts on a pale table"
              fill
              priority
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="rise-in mx-auto w-full max-w-[1199px] px-4 py-16 md:px-8 md:py-24">
        <h2 className="max-w-[12ch] pb-1 text-[clamp(2.5rem,6vw,3.875rem)] leading-[1.05] tracking-[-0.05em]">
          How a party gets made
        </h2>
        <div className="mt-12 divide-y divide-line">
          <article className="grid gap-2 py-8 md:grid-cols-[16rem_1fr] md:items-baseline">
            <h3 className="text-[2rem] leading-[1.13] tracking-[-0.031em]">Add the people</h3>
            <p className="max-w-[42ch] text-[15px] leading-[1.3] text-mute">At least three, with an email for each.</p>
          </article>
          <article className="grid gap-2 py-8 md:grid-cols-[16rem_1fr] md:items-baseline">
            <h3 className="text-[2rem] leading-[1.13] tracking-[-0.031em]">Set the party</h3>
            <p className="max-w-[42ch] text-[15px] leading-[1.3] text-mute">Date, place, and a budget.</p>
          </article>
          <article className="grid gap-2 py-8 md:grid-cols-[16rem_1fr] md:items-baseline">
            <h3 className="text-[2rem] leading-[1.13] tracking-[-0.031em]">Send the links</h3>
            <p className="max-w-[42ch] text-[15px] leading-[1.3] text-mute">Start the draw when the list is ready.</p>
          </article>
        </div>
      </section>

      <section className="rise-in mx-auto w-full max-w-[1199px] px-4 py-16 md:px-8 md:py-24">
        <h2 className="max-w-[14ch] pb-1 text-[clamp(2.5rem,6vw,3.875rem)] leading-[1.05] tracking-[-0.05em]">
          What each person gets
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <article className="spotlight flex min-h-[22rem] flex-col justify-end rounded-[30px] bg-[linear-gradient(165deg,#8b6cf8_0%,#6a4cf5_46%,#2c1870_100%)] p-8 text-white md:row-span-2 md:min-h-[34rem]">
            <h3 className="text-[2rem] leading-[1.13] tracking-[-0.031em]">One name</h3>
            <p className="mt-3 max-w-[24ch] text-2xl font-normal leading-[1.3] tracking-[-0.01em]">
              Each guest opens one link and sees only their match.
            </p>
          </article>
          <div className="relative min-h-56 overflow-hidden rounded-[20px] bg-surface">
            <Image
              src="/stack-gifts.jpg"
              alt="A stack of wrapped presents"
              fill
              sizes="(min-width: 768px) 36vw, 100vw"
              className="object-cover"
            />
          </div>
          <article className="rounded-[20px] bg-surface p-6">
            <h3 className="text-[2rem] leading-[1.13] tracking-[-0.031em]">A shared list</h3>
            <p className="mt-3 max-w-[36ch] text-[15px] leading-[1.3] text-mute">
              Each person writes gift ideas. The buyer can mark one taken.
            </p>
          </article>
          <article className="rounded-[20px] bg-lift p-6 md:col-span-2">
            <h3 className="text-[2rem] leading-[1.13] tracking-[-0.031em]">No account</h3>
            <p className="mt-3 max-w-[36ch] text-[15px] leading-[1.3] text-mute">
              The manage link is the key. Lose it, and we email it back.
            </p>
          </article>
        </div>
      </section>

      <section className="rise-in mx-auto w-full max-w-[1199px] px-4 py-16 md:px-8 md:py-24">
        <h2 className="max-w-[12ch] pb-1 text-[clamp(2.5rem,6vw,3.875rem)] leading-[1.05] tracking-[-0.05em]">
          What stays private
        </h2>
        <p className="mt-6 max-w-[46ch] text-lg leading-[1.3] tracking-[-0.01em] text-mute">
          Guests only see their own match. You open the full list from the manage page when you ask to.
        </p>
      </section>
    </PageShell>
  );
}
