import { NextResponse } from "next/server";
import { prepareEmailDraft, validateBrief } from "@/lib/contact";

export const runtime = "nodejs";
const MAX_BYTES = 32_768;
const responseHeaders = { "Cache-Control": "no-store" };
function reply(body: object, status: number) { return NextResponse.json(body, { status, headers: responseHeaders }); }

async function readLimitedBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError("Missing body");
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let bytes = 0;
  let body = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BYTES) { await reader.cancel(); throw new RangeError("Brief too large"); }
      body += decoder.decode(value, { stream: true });
    }
    return JSON.parse(body + decoder.decode()) as unknown;
  } finally { reader.releaseLock(); }
}

export async function POST(request: Request) {
  if (!/^application\/json(?:;|$)/i.test(request.headers.get("content-type") ?? "")) return reply({ errors: { form: "Use the project brief form to prepare your message." } }, 415);
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      const hosts = [request.headers.get("host"), request.headers.get("x-forwarded-host")?.split(",")[0]?.trim()];
      if (!hosts.includes(new URL(origin).host)) return reply({ errors: { form: "Please send your brief from this site's contact page." } }, 403);
    } catch { return reply({ errors: { form: "The request could not be verified." } }, 403); }
  }
  if (Number(request.headers.get("content-length")) > MAX_BYTES) return reply({ errors: { form: "Your brief is too long. Please shorten it or email Joseph directly." } }, 413);
  try {
    const input = await readLimitedBody(request);
    const result = validateBrief(input);
    if (!result.ok) return reply({ errors: result.errors }, 422);
    const draft = prepareEmailDraft(result.data);
    // No delivery provider has been selected. Never claim a message was sent.
    // Personal details are not logged, stored, or forwarded by this fallback route.
    return reply({ delivery: "mailto", mailto: draft.href, text: draft.text }, 200);
  } catch (error) {
    return reply({ errors: { form: error instanceof RangeError ? "Your brief is too long. Please shorten it or email Joseph directly." : "Your brief could not be read. Please try again or email Joseph directly." } }, error instanceof RangeError ? 413 : 400);
  }
}
