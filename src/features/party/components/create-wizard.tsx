"use client";

import { useState } from "react";
import { createPartyAction } from "@/features/party/party.actions";
import { parsePeopleList, type PersonInput } from "@/features/party/helpers/party.helpers";
import {
  cardClass,
  chipActiveClass,
  chipClass,
  errorTextClass,
  fieldClass,
  GhostButton,
  hintClass,
  InkButton,
  labelClass,
  MetaLine,
  pageTitleClass,
  textLinkClass,
} from "@/shared/components/page-shell";

const emptyGuest = (): PersonInput => ({ name: "", email: "" });

const steps = ["People", "Party", "Review"] as const;

export function CreateWizard() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [organizerName, setOrganizerName] = useState("");
  const [organizerEmail, setOrganizerEmail] = useState("");
  const [guests, setGuests] = useState<PersonInput[]>([emptyGuest(), emptyGuest()]);
  const [csvText, setCsvText] = useState("");
  const [showCsv, setShowCsv] = useState(false);
  const [partyName, setPartyName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [pending, setPending] = useState(false);

  function updateGuest(index: number, field: keyof PersonInput, value: string) {
    setGuests((current) =>
      current.map((guest, guestIndex) =>
        guestIndex === index ? { ...guest, [field]: value } : guest,
      ),
    );
  }

  async function submitParty() {
    setPending(true);
    setErrorMessage("");
    const result = await createPartyAction({
      organizerName,
      organizerEmail,
      guests,
      partyName,
      eventDate,
      location,
      budget,
      message,
    });
    if (result?.error) {
      setErrorMessage(result.error);
      setPending(false);
    }
  }

  return (
    <div className={`enter mx-auto max-w-xl ${cardClass}`}>
      <ol className="mb-8 flex flex-wrap gap-2">
        {steps.map((label, index) => {
          const number = (index + 1) as 1 | 2 | 3;
          const active = step === number;
          return (
            <li key={label}>
              <span className={active ? chipActiveClass : chipClass}>{label}</span>
            </li>
          );
        })}
      </ol>

      {errorMessage ? <p className={`mb-4 ${errorTextClass}`}>{errorMessage}</p> : null}

      {step === 1 ? (
        <div className="space-y-4">
          <h1 className={pageTitleClass}>Who is in</h1>
          <p className="text-sm font-medium text-mute">You are the organizer. At least 3 people.</p>
          <label className={labelClass}>
            Your name
            <span className={hintClass}>This is you, the organizer.</span>
            <input
              className={fieldClass}
              value={organizerName}
              onChange={(event) => setOrganizerName(event.target.value)}
            />
          </label>
          <label className={labelClass}>
            Your email
            <span className={hintClass}>We send the manage link here.</span>
            <input
              type="email"
              className={fieldClass}
              value={organizerEmail}
              onChange={(event) => setOrganizerEmail(event.target.value)}
            />
          </label>
          {guests.map((guest, index) => (
            <div key={index} className="space-y-3 border-t border-line pt-4">
              <label className={labelClass}>
                Name
                <input
                  className={fieldClass}
                  value={guest.name}
                  onChange={(event) => updateGuest(index, "name", event.target.value)}
                />
              </label>
              <label className={labelClass}>
                Email
                <span className={hintClass}>Their private link goes here.</span>
                <input
                  type="email"
                  className={fieldClass}
                  value={guest.email}
                  onChange={(event) => updateGuest(index, "email", event.target.value)}
                />
              </label>
              {guests.length > 2 ? (
                <button
                  type="button"
                  className="text-sm font-medium text-mute"
                  onClick={() => setGuests((current) => current.filter((_, guestIndex) => guestIndex !== index))}
                >
                  Remove
                </button>
              ) : null}
            </div>
          ))}
          <div className="flex flex-wrap gap-3">
            <GhostButton type="button" onClick={() => setGuests((current) => [...current, emptyGuest()])}>
              Add a person
            </GhostButton>
            <button
              type="button"
              className={textLinkClass}
              onClick={() => setShowCsv((current) => !current)}
            >
              Paste a list
            </button>
          </div>
          {showCsv ? (
            <label className={labelClass}>
              One person per line: Name, email
              <textarea
                className={`${fieldClass} min-h-28`}
                value={csvText}
                onChange={(event) => setCsvText(event.target.value)}
              />
              <button
                type="button"
                className={`mt-2 ${textLinkClass}`}
                onClick={() => {
                  const parsed = parsePeopleList(csvText);
                  if (parsed.length > 0) setGuests(parsed);
                }}
              >
                Use this list
              </button>
            </label>
          ) : null}
          <InkButton type="button" onClick={() => setStep(2)}>
            Next
          </InkButton>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-4">
          <h1 className={pageTitleClass}>Party details</h1>
          <label className={labelClass}>
            Party name
            <span className={hintClass}>Friends see this on their page.</span>
            <input className={fieldClass} value={partyName} onChange={(event) => setPartyName(event.target.value)} />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClass}>
              Date
              <span className={hintClass}>Optional.</span>
              <input
                type="date"
                className={fieldClass}
                value={eventDate}
                onChange={(event) => setEventDate(event.target.value)}
              />
            </label>
            <label className={labelClass}>
              Budget
              <span className={hintClass}>Optional. Any wording, like $25.</span>
              <input className={fieldClass} value={budget} onChange={(event) => setBudget(event.target.value)} />
            </label>
          </div>
          <label className={labelClass}>
            Place
            <span className={hintClass}>Optional.</span>
            <input className={fieldClass} value={location} onChange={(event) => setLocation(event.target.value)} />
          </label>
          <label className={labelClass}>
            Note in the email
            <span className={hintClass}>Optional. It goes in the guest email.</span>
            <textarea
              className={`${fieldClass} min-h-24`}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </label>
          <div className="flex gap-3">
            <GhostButton type="button" onClick={() => setStep(1)}>
              Back
            </GhostButton>
            <InkButton type="button" onClick={() => setStep(3)}>
              Next
            </InkButton>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="space-y-4">
          <h1 className={pageTitleClass}>Review and send</h1>
          <p className="font-medium">{partyName || "Untitled party"}</p>
          <MetaLine parts={[eventDate, location, budget]} />
          <p className="text-sm font-medium text-mute">
            {[organizerName || "Organizer", ...guests.map((guest) => guest.name).filter(Boolean)].join(", ")}
          </p>
          {message ? <p className="text-sm font-medium text-mute">{message}</p> : null}
          <p className="rounded-[10px] bg-lift px-4 py-3 text-sm text-mute">
            Guests are not emailed yet. You get a manage link first, then you start the draw.
          </p>
          <div className="flex gap-3">
            <GhostButton type="button" onClick={() => setStep(2)} disabled={pending}>
              Back
            </GhostButton>
            <InkButton type="button" disabled={pending} onClick={() => void submitParty()}>
              {pending ? "Sending..." : "Send organizer link"}
            </InkButton>
          </div>
        </div>
      ) : null}
    </div>
  );
}
