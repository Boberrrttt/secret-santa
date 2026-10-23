import { joinPartyAction } from "@/features/party/party.actions";
import { PartyStatus } from "@/features/party/party.constants";
import {
  cardClass,
  fieldClass,
  hintClass,
  InkButton,
  labelClass,
  MetaLine,
  Notice,
  pageTitleClass,
} from "@/shared/components/page-shell";

export function JoinScreen({
  joinToken,
  party,
  notice,
}: {
  joinToken: string;
  party: {
    name: string;
    eventDate: string;
    location: string;
    budget: string;
    status: PartyStatus;
  };
  notice?: string;
}) {
  return (
    <div className={`enter mx-auto max-w-md space-y-4 ${cardClass}`}>
      <h1 className={pageTitleClass}>Join {party.name}</h1>
      <MetaLine parts={[party.eventDate, party.location, party.budget ? `Budget ${party.budget}` : ""]} />
      <Notice message={notice} />
      {party.status === PartyStatus.Drawn ? (
        <p className="rounded-[10px] bg-lift px-4 py-5 text-sm text-mute">This party has already drawn names.</p>
      ) : (
        <form action={joinPartyAction.bind(null, joinToken)} className="space-y-4">
          <label className={labelClass}>
            Your name
            <span className={hintClass}>The group sees this name.</span>
            <input name="name" required className={fieldClass} />
          </label>
          <label className={labelClass}>
            Your email
            <span className={hintClass}>Your private link goes here.</span>
            <input name="email" type="email" required className={fieldClass} />
          </label>
          <InkButton>Join the party</InkButton>
        </form>
      )}
    </div>
  );
}
