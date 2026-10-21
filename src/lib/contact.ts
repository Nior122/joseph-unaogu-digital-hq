import { contactProjectTypes, getProject, site } from "@/lib/content";

export type ContactBrief = {
  name: string;
  email: string;
  service: string;
  message: string;
  budget: string;
  deadline: string;
  project: string;
  website: string;
};
export type BriefErrors = Partial<Record<keyof ContactBrief | "form", string>>;
export const briefLimits = {
  name: 100,
  email: 254,
  message: 5000,
  budget: 100,
  deadline: 120,
};
export type BriefValidation =
  { ok: true; data: ContactBrief } | { ok: false; errors: BriefErrors };

/** Shared usability checks in the browser; the route always repeats them server-side. */
export function validateBrief(input: unknown): BriefValidation {
  if (!input || typeof input !== "object" || Array.isArray(input))
    return {
      ok: false,
      errors: {
        form: "Your brief could not be read. Please use the form or email Joseph directly.",
      },
    };
  const raw = input as Record<string, unknown>;
  const fields: (keyof ContactBrief)[] = [
    "name",
    "email",
    "service",
    "message",
    "budget",
    "deadline",
    "project",
    "website",
  ];
  const data = Object.fromEntries(
    fields.map((key) => [
      key,
      typeof raw[key] === "string" ? raw[key].trim() : "",
    ]),
  ) as ContactBrief;
  if (data.website)
    return {
      ok: false,
      errors: {
        form: "Your brief was not sent. Please email Joseph directly or use WhatsApp.",
      },
    };
  const errors: BriefErrors = {};
  if (!data.name) errors.name = "Enter your name.";
  else if (
    data.name.length > briefLimits.name ||
    /[\r\n\u0000]/.test(data.name)
  )
    errors.name =
      "Use one line, with no more than 100 characters, for your name.";
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
    data.email.length > briefLimits.email
  )
    errors.email = "Enter a valid email address.";
  if (!contactProjectTypes.includes(data.service))
    errors.service = "Choose one of the listed services.";
  if (data.message.length < 20)
    errors.message = "Write at least 20 characters about your project.";
  else if (data.message.length > briefLimits.message)
    errors.message =
      "Keep your project description to 5,000 characters or fewer.";
  if (
    data.budget.length > briefLimits.budget ||
    /[\r\n\u0000]/.test(data.budget)
  )
    errors.budget = "Keep the budget to one line of 100 characters or fewer.";
  if (
    data.deadline.length > briefLimits.deadline ||
    /[\r\n\u0000]/.test(data.deadline)
  )
    errors.deadline =
      "Keep the deadline to one line of 120 characters or fewer.";
  if (data.project && !getProject(data.project))
    errors.form =
      "That project was not found. Open a project from the Work page or contact Joseph directly.";
  return Object.keys(errors).length
    ? { ok: false, errors }
    : { ok: true, data };
}

export function prepareEmailDraft(data: ContactBrief) {
  const project = data.project ? getProject(data.project) : undefined;
  const subject = `Project brief: ${data.service} — ${data.name}`;
  const text = [
    `Name: ${data.name}`,
    `Reply to: ${data.email}`,
    `What I need: ${data.service}`,
    ...(project ? [`Project I'm interested in: ${project.name}`] : []),
    `Budget: ${data.budget || "Not provided"}`,
    `Deadline: ${data.deadline || "Not provided"}`,
    "",
    "About the project:",
    data.message,
  ].join("\n");
  return {
    href: `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`,
    text,
  };
}
