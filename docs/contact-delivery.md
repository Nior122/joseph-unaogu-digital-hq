# Contact delivery handoff

## Current behavior

No delivery provider has been selected or connected. No provider API key is needed.

1. The visitor fills in the brief on `/contact`.
2. Browser and server validation check the required fields and limits.
3. `POST /api/contact` returns an encoded email draft addressed to Joseph.
4. The page explicitly says that the message has **not been sent**. The visitor can open the draft, copy its text, or view/select it manually.
5. If the request fails, the form shows an error, retains the entered text, and offers a direct-email fallback without claiming success. Direct email, WhatsApp, and LinkedIn links remain available separately.

The application does not log, store, or forward briefs. The draft response is not proof of delivery. JavaScript-disabled visitors receive instructions to use the direct contact links; there is no silent form submission.

## API contract

The route accepts `application/json` with:

| Field      | Validation                                                           |
| ---------- | -------------------------------------------------------------------- |
| `name`     | Required; at most 100 characters; one line                           |
| `email`    | Required; basic email-format check; at most 254 characters; one line |
| `service`  | Required; one of the six published project types                     |
| `message`  | Required; 20–5,000 characters after trimming                         |
| `budget`   | Optional free text; at most 100 characters; one line                 |
| `deadline` | Optional free text; at most 120 characters; one line                 |
| `project`  | Optional; must be one of the 16 known project slugs                  |
| `website`  | Hidden honeypot; must be empty                                       |

Unknown project slugs are not used for prefill. Known `?project=<slug>` values prefill “I'm interested in: <name>”. All draft text is URI-encoded rather than placed into email headers directly.

Successful draft preparation returns HTTP 200:

```json
{
  "delivery": "mailto",
  "mailto": "mailto:…",
  "text": "…"
}
```

Errors return an `errors` object: 400 for unreadable JSON/encoding, 403 for a rejected origin, 413 for a body over 32,768 bytes, 415 for a wrong content type, and 422 for invalid fields or a filled honeypot. Responses use `Cache-Control: no-store`. The origin check accounts for the host forwarded by a deployment proxy.

This endpoint prepares drafts; it is not an email-sending API. The honeypot and request limits are basic validation, not a complete anti-abuse service.

## Decision needed before adding delivery

**Which provider should send the email: Resend, Formspree, or Web3Forms?**

Do not add an integration until Joseph chooses. Domain, sender, recipient, service limits, and any verification requirements must then be checked against the selected provider. No provider account or verified sending domain is assumed to exist.

After the choice:

1. Configure the provider account and required sender/recipient verification.
2. Add credentials through local or hosting environment settings, **server-side only**. Never commit real credentials or prefix them with `NEXT_PUBLIC_`.
3. Add the provider call in `src/app/api/contact/route.ts`, retaining shared validation, the honeypot, body limits, and no-store behavior. Review rate limiting and trusted-proxy/origin handling for the actual deployment.
4. Give the client a distinct delivery result. Only report success after the provider confirms acceptance; acceptance is still not a guarantee of inbox delivery.
5. Keep a direct-email fallback for provider failures. Show an actionable error without discarding the visitor's text.
6. Add mocked provider success/failure tests and verify a real message arrives in the intended inbox. Do not put message contents or keys in logs.
7. Update the UI and privacy wording to match the provider's actual processing and retention behavior.

The only current public configuration is `NEXT_PUBLIC_SITE_URL`; `.env.example` intentionally contains no speculative provider keys.
