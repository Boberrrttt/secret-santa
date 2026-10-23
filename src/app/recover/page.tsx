import { RecoverScreen } from "@/features/party/components/recover-screen";
import { PageShell } from "@/shared/components/page-shell";

export default function RecoverPage() {
  return (
    <PageShell active="/recover">
      <RecoverScreen />
    </PageShell>
  );
}
