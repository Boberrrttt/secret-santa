"use client";

import { useState } from "react";
import { recoverLinksAction } from "@/features/party/party.actions";
import { cardClass, fieldClass, hintClass, inkButtonClass, labelClass, pageTitleClass } from "@/shared/components/page-shell";

export function RecoverScreen() {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  return (
    <form
      className={`enter mx-auto max-w-md space-y-4 ${cardClass}`}
      action={async (formData) => {
        setPending(true);
        const result = await recoverLinksAction(formData);
        setMessage(result.message);
        setPending(false);
      }}
    >
      <h1 className={pageTitleClass}>Send links</h1>
      <p className="text-sm font-medium leading-[1.4] text-mute">
        Use the address you joined with. We send the manage link and every guest link on that address.
      </p>
      {message ? <p className="rounded-[10px] bg-lift px-4 py-3 text-sm text-ink">{message}</p> : null}
      <label className={labelClass}>
        Email
        <span className={hintClass}>The same address from the party.</span>
        <input name="email" type="email" required className={fieldClass} />
      </label>
      <button type="submit" disabled={pending} className={inkButtonClass}>
        {pending ? "Sending..." : "Send links"}
      </button>
    </form>
  );
}
