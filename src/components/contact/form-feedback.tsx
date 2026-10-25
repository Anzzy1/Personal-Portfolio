import { WarningCircleIcon } from "@phosphor-icons/react/dist/ssr";

/** Inline note under the email field, with a one-tap fix for typos */
export function EmailHint({
  issue,
  onUse,
}: {
  issue: { reason: string; suggestion?: string } | null;
  onUse: (suggestion: string) => void;
}) {
  if (!issue) return null;
  return (
    <p id="email-hint" role="alert" className="mt-1.5 flex flex-wrap items-center gap-x-1.5 text-[13px] text-accent">
      <WarningCircleIcon weight="fill" className="size-4 shrink-0" />
      {issue.reason}
      {issue.suggestion && (
        <button
          type="button"
          onClick={() => onUse(issue.suggestion!)}
          className="font-semibold text-fg underline decoration-accent/50 underline-offset-2 hover:decoration-accent"
        >
          Use {issue.suggestion}?
        </button>
      )}
    </p>
  );
}

/** Banner for send errors that aren't about one field */
export function FormError({ message, mailto }: { message: string | null; mailto?: string | null }) {
  if (!message) return null;
  return (
    <p role="alert" className="flex items-start gap-2 rounded-xl bg-accent-soft px-3.5 py-2.5 text-sm text-fg">
      <WarningCircleIcon weight="fill" className="mt-0.5 size-4 shrink-0 text-accent" />
      <span>
        {message}
        {mailto && (
          <>
            {" "}
            <a
              href={mailto}
              className="font-semibold text-fg underline decoration-accent/50 underline-offset-2 hover:decoration-accent"
            >
              Open your email app instead
            </a>
          </>
        )}
      </span>
    </p>
  );
}

/** Off-screen field that only bots fill in. Named to dodge browser autofill. */
export function Honeypot() {
  return (
    <input
      type="text"
      name="hp_confirm"
      tabIndex={-1}
      autoComplete="off"
      data-lpignore="true"
      data-1p-ignore
      aria-hidden
      className="absolute -left-[9999px] size-px opacity-0"
    />
  );
}
