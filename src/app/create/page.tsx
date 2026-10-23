import { CreateWizard } from "@/features/party/components/create-wizard";
import { PageShell } from "@/shared/components/page-shell";

export default function CreatePage() {
  return (
    <PageShell>
      <CreateWizard />
    </PageShell>
  );
}
