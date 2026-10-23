import { notFound } from "next/navigation";
import { ManageScreen } from "@/features/party/components/manage-screen";
import { PartyError, getManageParty } from "@/features/party/services/party.service";
import { PageShell } from "@/shared/components/page-shell";

export default async function ManagePage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ notice?: string; reveal?: string }>;
}) {
  const { token } = await params;
  const query = await searchParams;
  let party;
  try {
    party = await getManageParty(token);
  } catch (caughtError) {
    if (caughtError instanceof PartyError) notFound();
    throw caughtError;
  }
  return (
    <PageShell>
      <ManageScreen
        manageToken={token}
        party={party}
        notice={query.notice}
        reveal={query.reveal === "1"}
      />
    </PageShell>
  );
}
