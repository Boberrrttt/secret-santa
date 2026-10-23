import Link from "next/link";
import type { ReactNode } from "react";

const focus =
  "focus-visible:outline-none focus-visible:shadow-[0_0_0_1px_#0099ff,0_0_0_4px_rgba(0,153,255,0.15)]";

const press =
  "inline-flex h-11 cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-[15px] text-sm font-medium leading-none tracking-[-0.01em] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100";

export const inkButtonClass = `${press} bg-white text-black hover:bg-[#e8e8e8] ${focus}`;
export const ghostButtonClass = `${press} bg-surface text-ink hover:bg-lift ${focus}`;
export const dangerButtonClass = `${press} bg-surface text-coral hover:bg-lift ${focus}`;

export const chipClass =
  "inline-flex h-10 items-center rounded-full bg-canvas px-3.5 text-sm font-medium text-mute";
export const chipActiveClass =
  "inline-flex h-10 items-center rounded-full bg-lift px-3.5 text-sm font-medium text-ink";

export const textLinkClass = `rounded-sm text-sm font-medium text-link ${focus}`;

export const labelClass = "block text-sm font-medium leading-[1.4] tracking-[-0.01em] text-ink";
export const hintClass = "mt-1 block text-[13px] font-medium leading-[1.2] tracking-[-0.01em] text-mute";
export const errorTextClass = "text-sm font-medium text-coral";
export const cardClass = "rounded-[20px] bg-surface p-6";
export const panelClass = `space-y-4 ${cardClass}`;
export const pageTitleClass =
  "text-[clamp(2rem,4vw,2.75rem)] leading-[1.08] tracking-[-0.045em] text-ink";
export const blockTitleClass = "text-[2rem] leading-[1.13] tracking-[-0.031em] text-ink";

export const fieldClass =
  "mt-2 min-h-12 w-full rounded-[10px] border border-hairline bg-lift px-3.5 text-[15px] leading-[1.3] tracking-[-0.01em] text-ink outline-none placeholder:text-mute focus:border-link focus:shadow-[0_0_0_1px_rgba(0,153,255,0.15)]";

type ActionButtonProps = {
  children: ReactNode;
  type?: "submit" | "button";
  disabled?: boolean;
  onClick?: () => void;
};

export function PageShell({ children, flush = false }: { children: ReactNode; flush?: boolean }) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-canvas">
      <header className="sticky top-0 z-20 border-b border-line bg-canvas">
        <div className="mx-auto flex h-14 w-full max-w-[1199px] items-center justify-between gap-3 px-4 md:px-8">
          <Link href="/" className={`font-display text-[15px] font-medium tracking-[-0.04em] text-ink ${focus}`}>
            Secret Santa
          </Link>
          <nav className="flex items-center gap-2">
            <Link href="/recover" className={ghostButtonClass}>
              Send links
            </Link>
            <Link href="/create" className={inkButtonClass}>
              Create party
            </Link>
          </nav>
        </div>
      </header>
      <main className={flush ? "w-full flex-1" : "mx-auto w-full max-w-[1199px] flex-1 px-4 py-16 md:px-8"}>
        {children}
      </main>
      <footer className="bg-canvas">
        <div className="mx-auto flex w-full max-w-[1199px] items-center px-8 py-16">
          <p className="text-[13px] font-medium leading-[1.2] tracking-[-0.01em] text-mute">
            Private links. No account.
          </p>
        </div>
      </footer>
    </div>
  );
}

export function Notice({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="rounded-[10px] bg-lift px-4 py-3 text-sm text-ink">{message}</p>;
}

export function MetaLine({ parts }: { parts: Array<string | null | undefined | false> }) {
  const visible = parts.filter((part): part is string => Boolean(part));
  if (visible.length === 0) return null;
  return (
    <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium text-mute">
      {visible.map((part, index) => (
        <span key={`${part}-${index}`}>{part}</span>
      ))}
    </p>
  );
}

export function InkButton({ children, type = "submit", disabled, onClick }: ActionButtonProps) {
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={inkButtonClass}>
      {children}
    </button>
  );
}

export function GhostButton({ children, type = "submit", disabled, onClick }: ActionButtonProps) {
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={ghostButtonClass}>
      {children}
    </button>
  );
}

export function DangerButton({ children, type = "submit", disabled, onClick }: ActionButtonProps) {
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={dangerButtonClass}>
      {children}
    </button>
  );
}

export function InkLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={inkButtonClass}>
      {children}
    </Link>
  );
}
