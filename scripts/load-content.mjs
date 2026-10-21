import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";

/** Load the real content module, including its generated JSON assets, without a second data list. */
export function loadContent() {
  const sourceUrl = new URL("../src/lib/content.ts", import.meta.url);
  const code = ts.transpileModule(readFileSync(sourceUrl, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  }).outputText;
  const contentModule = { exports: {} };
  new Function("module", "exports", "require", code)(
    contentModule,
    contentModule.exports,
    createRequire(fileURLToPath(sourceUrl)),
  );
  return contentModule.exports;
}
