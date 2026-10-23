import { InkLink, pageTitleClass, PageShell } from "@/shared/components/page-shell";

export default function NotFound() {
  return (
    <PageShell>
      <div className="enter mx-auto max-w-md space-y-5">
        <h1 className={pageTitleClass}>This link does not match a party</h1>
        <p className="text-[15px] leading-[1.3] text-mute">It may have been deleted.</p>
        <InkLink href="/create">Create party</InkLink>
      </div>
    </PageShell>
  );
}
