import { notFound } from "next/navigation";
import { GuestScreen } from "@/features/party/components/guest-screen";
import { getGuestParty, PartyError } from "@/features/party/services/party.service";
import { PageShell } from "@/shared/components/page-shell";

export default async function GuestPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ notice?: string }>;
}) {
  const { token } = await params;
  const query = await searchParams;
  let guest;
  try {
    guest = await getGuestParty(token);
  } catch (caughtError) {
    if (caughtError instanceof PartyError) notFound();
    throw caughtError;
  }
  return (
    <PageShell>
      <GuestScreen accessToken={token} guest={guest} notice={query.notice} />
    </PageShell>
  );
}
