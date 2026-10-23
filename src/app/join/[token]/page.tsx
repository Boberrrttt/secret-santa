import { notFound } from "next/navigation";
import { JoinScreen } from "@/features/party/components/join-screen";
import { getJoinParty } from "@/features/party/services/party.service";
import { PageShell } from "@/shared/components/page-shell";

export default async function JoinPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ notice?: string }>;
}) {
  const { token } = await params;
  const query = await searchParams;
  const party = await getJoinParty(token);
  if (!party) notFound();
  return (
    <PageShell>
      <JoinScreen joinToken={token} party={party} notice={query.notice} />
    </PageShell>
  );
}
