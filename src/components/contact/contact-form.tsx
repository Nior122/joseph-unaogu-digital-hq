"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { Button, ButtonAction } from "@/components/ui/button";
import { site, contactProjectTypes } from "@/lib/content";
import {
  briefLimits,
  validateBrief,
  type BriefErrors,
  type ContactBrief,
} from "@/lib/contact";

type Draft = { href: string; text: string };
const fieldLabels: Record<string, string> = {
  name: "Your name",
  email: "Your email",
  service: "What do you need?",
  message: "Tell me about your project",
  budget: "Budget",
  deadline: "When do you need it?",
};
export default function ContactForm({
  project,
  initialService = "Not sure",
}: {
  project?: { slug: string; name: string };
  initialService?: string;
}) {
  const [form, setForm] = useState<ContactBrief>({
    name: "",
    email: "",
    service: initialService,
    message: project ? `I'm interested in: ${project.name}\n\n` : "",
    budget: "",
    deadline: "",
    project: project?.slug ?? "",
    website: "",
  });
  const [errors, setErrors] = useState<BriefErrors>({});
  const [pending, setPending] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [copied, setCopied] = useState(false);
  const errorSummary = useRef<HTMLDivElement>(null);
  function update(key: keyof ContactBrief, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
    setDraft(null);
    setCopied(false);
  }
  function showErrors(next: BriefErrors) {
    setErrors(next);
    requestAnimationFrame(() => errorSummary.current?.focus());
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDraft(null);
    const validation = validateBrief(
      Object.fromEntries(new FormData(event.currentTarget)),
    );
    if (!validation.ok) {
      showErrors(validation.errors);
      return;
    }
    setPending(true);
    setErrors({});
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
        signal: AbortSignal.timeout(10_000),
      });
      const result = (await response.json()) as {
        delivery?: string;
        mailto?: string;
        text?: string;
        errors?: BriefErrors;
      };
      if (!response.ok) {
        showErrors(
          result.errors ?? {
            form: "Something went wrong and your message was not sent. Please email me directly or use WhatsApp.",
          },
        );
        return;
      }
      if (
        result.delivery !== "mailto" ||
        !result.mailto?.startsWith(`mailto:${site.email}?`) ||
        !result.text
      )
        throw new Error("Unexpected response");
      setDraft({ href: result.mailto, text: result.text });
    } catch {
      showErrors({
        form: "Something went wrong and your message was not sent. Please email me directly or use WhatsApp.",
      });
    } finally {
      setPending(false);
    }
  }
  async function copyBrief() {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(draft.text);
      setCopied(true);
    } catch {
      showErrors({
        form: "Copying is not available in this browser. You can select the prepared brief below and copy it yourself.",
      });
    }
  }
  function describedBy(key: keyof ContactBrief, hint?: string) {
    return (
      [hint, errors[key] ? `brief-${key}-error` : ""]
        .filter(Boolean)
        .join(" ") || undefined
    );
  }
  const errorEntries = Object.entries(errors);
  return (
    <form
      action="/api/contact"
      method="post"
      onSubmit={submit}
      noValidate
      className="brief"
      aria-labelledby="project-brief-title"
    >
      <noscript>
        <p className="form-message">
          The brief helper needs JavaScript. Please use the Email or WhatsApp
          links above instead.
        </p>
      </noscript>
      <div className="form-fields">
        {errorEntries.length > 0 && (
          <div
            ref={errorSummary}
            tabIndex={-1}
            role="alert"
            className="form-message form-error"
          >
            <h3>Please check your brief</h3>
            <ul className="list-none p-0 mt-3">
              {errorEntries.map(([key, message]) => (
                <li key={key}>
                  {fieldLabels[key] ? (
                    <a className="text-link" href={`#brief-${key}`}>
                      {fieldLabels[key]}: {message}
                    </a>
                  ) : (
                    <p>{message}</p>
                  )}
                </li>
              ))}
            </ul>
            <a className="text-link" href={`mailto:${site.email}`}>
              Email Joseph directly
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        )}
        {project && (
          <p className="form-message">
            You're asking about <strong>{project.name}</strong>. Add a few
            details to the message below.
          </p>
        )}
        <div className="form-row">
          <div className="field">
            <label htmlFor="brief-name">
              Your name <span className="field-hint">(required)</span>
            </label>
            <input
              id="brief-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={briefLimits.name}
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={describedBy("name")}
            />
            {errors.name && (
              <p className="field-error" id="brief-name-error">
                {errors.name}
              </p>
            )}
          </div>
          <div className="field">
            <label htmlFor="brief-email">
              Your email <span className="field-hint">(required)</span>
            </label>
            <input
              id="brief-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={briefLimits.email}
              value={form.email}
              onChange={(event) => update("email", event.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={describedBy("email")}
            />
            {errors.email && (
              <p className="field-error" id="brief-email-error">
                {errors.email}
              </p>
            )}
          </div>
        </div>
        <div className="field">
          <label htmlFor="brief-service">
            What do you need? <span className="field-hint">(required)</span>
          </label>
          <select
            id="brief-service"
            name="service"
            required
            value={form.service}
            onChange={(event) => update("service", event.target.value)}
            aria-invalid={!!errors.service}
            aria-describedby={describedBy("service")}
          >
            {contactProjectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="field-error" id="brief-service-error">
              {errors.service}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="brief-message">
            Tell me about your project{" "}
            <span className="field-hint">(required)</span>
          </label>
          <p className="field-hint" id="brief-message-hint">
            A few sentences is fine. Use 20 to 5,000 characters.
          </p>
          <textarea
            id="brief-message"
            name="message"
            rows={6}
            required
            minLength={20}
            maxLength={briefLimits.message}
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={describedBy("message", "brief-message-hint")}
          />
          {errors.message && (
            <p className="field-error" id="brief-message-error">
              {errors.message}
            </p>
          )}
        </div>
        <div className="form-row">
          <div className="field">
            <label htmlFor="brief-budget">
              Budget <span className="field-hint">(optional)</span>
            </label>
            <input
              id="brief-budget"
              name="budget"
              type="text"
              maxLength={briefLimits.budget}
              value={form.budget}
              onChange={(event) => update("budget", event.target.value)}
              aria-invalid={!!errors.budget}
              aria-describedby={describedBy("budget")}
            />
            {errors.budget && (
              <p className="field-error" id="brief-budget-error">
                {errors.budget}
              </p>
            )}
          </div>
          <div className="field">
            <label htmlFor="brief-deadline">
              When do you need it?{" "}
              <span className="field-hint">(optional)</span>
            </label>
            <input
              id="brief-deadline"
              name="deadline"
              type="text"
              maxLength={briefLimits.deadline}
              value={form.deadline}
              onChange={(event) => update("deadline", event.target.value)}
              aria-invalid={!!errors.deadline}
              aria-describedby={describedBy("deadline")}
            />
            {errors.deadline && (
              <p className="field-error" id="brief-deadline-error">
                {errors.deadline}
              </p>
            )}
          </div>
        </div>
        <input type="hidden" name="project" value={form.project} />
        <div hidden aria-hidden="true">
          <label htmlFor="brief-website">Leave this empty</label>
          <input
            id="brief-website"
            type="text"
            name="website"
            autoComplete="off"
            tabIndex={-1}
            value={form.website}
            onChange={(event) => update("website", event.target.value)}
          />
        </div>
        <p className="field-hint">
          This form prepares an email draft. It does not send a message until
          you open your email app and press Send.
        </p>
        <div>
          <ButtonAction type="submit" disabled={pending}>
            <Mail size={18} aria-hidden="true" />
            {pending ? "Preparing your brief…" : "Send my brief"}
          </ButtonAction>
        </div>
      </div>
      <div className={draft ? "form-message stack" : undefined}>
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="stack"
        >
          {draft && (
            <>
              <h3>Your email draft is ready</h3>
              <p>
                Open your email app, check the details, then press Send. Your
                message has not been sent yet.
              </p>
            </>
          )}
        </div>
        {draft && (
          <>
            <div className="button-row">
              <Button href={draft.href}>
                Open my email draft
                <ArrowUpRight size={17} aria-hidden="true" />
              </Button>
              <ButtonAction variant="secondary" onClick={copyBrief}>
                {copied ? (
                  <Check size={17} aria-hidden="true" />
                ) : (
                  <Copy size={17} aria-hidden="true" />
                )}
                {copied ? "Brief copied" : "Copy my brief"}
              </ButtonAction>
            </div>
            <details>
              <summary className="text-link">View the prepared brief</summary>
              <div className="field mt-4">
                <label htmlFor="prepared-brief">
                  Prepared brief (you can select and copy this text)
                </label>
                <textarea
                  id="prepared-brief"
                  readOnly
                  value={draft.text}
                  rows={10}
                />
              </div>
            </details>
            <p className="small-text">
              No email app? Copy your brief and email it to{" "}
              <a
                className="text-link"
                href={`mailto:${site.email}`}
                style={{ overflowWrap: "anywhere" }}
              >
                {site.email}
              </a>
              .
            </p>
          </>
        )}
      </div>
      <p className="form-privacy">
        I only use your details to reply to you. This form does not store them
        on the site.
      </p>
    </form>
  );
}
