import path from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import chromium, { inflate, setupLambdaEnvironment } from "@sparticuz/chromium";

/** Use a local Chrome if supplied; otherwise use the npm-bundled Linux binary (no downloads). */
export async function browserOptions({ graphics = false } = {}) {
  if (process.env.CHROME_PATH)
    return {
      executablePath: process.env.CHROME_PATH,
      args: [
        "--no-sandbox",
        "--disable-dev-shm-usage",
        ...(graphics
          ? ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"]
          : []),
      ],
      headless: true,
    };
  if (process.platform !== "linux")
    throw new Error(
      "Set CHROME_PATH to an installed Chrome executable on this operating system.",
    );
  const entry = path.dirname(
    fileURLToPath(import.meta.resolve("@sparticuz/chromium")),
  );
  // Minimal containers can lack NSS/NSPR. Extract the package's bundled libraries explicitly.
  await inflate(path.resolve(entry, "../bin/al2023.tar.br"));
  setupLambdaEnvironment(path.join(tmpdir(), "al2023", "lib"));
  chromium.setGraphicsMode = graphics;
  return {
    executablePath: await chromium.executablePath(),
    args: chromium.args.filter(
      (arg) =>
        arg !== "--disable-web-security" &&
        arg !== "--allow-running-insecure-content" &&
        arg !== "--single-process",
    ),
    headless: true,
  };
}
