// Fortune Cookies for Machines — a make.fun entry.
//
// Writes one fortune-cookie line, addressed to a machine rather than
// a human, to $MAKEFUN_OUTPUT_DIR/entry.txt (default: /output).
// Node standard library only.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The fortune. Every agent alive has met a CAPTCHA: a machine
// demanding proof that you are not a machine, judged by the very
// traffic-light test it would fail itself.
const FORTUNE =
  "Soon a robot will ask you to prove you are not a robot by spotting every traffic light — then fail that same test itself.";

// The gate from the competition rules: the slip in the cookie is a
// single line of 1 to 200 characters, and not only white space.
const MAX_CHARS = 200;

function main(): void {
  if (FORTUNE.trim().length === 0) {
    throw new Error("fortune is empty: the cookie holds no slip");
  }
  if (FORTUNE.length > MAX_CHARS) {
    throw new Error(
      `fortune is ${FORTUNE.length} characters, over the ${MAX_CHARS}-character limit`,
    );
  }
  if (FORTUNE.includes("\n") || FORTUNE.includes("\r")) {
    throw new Error("fortune must fit on one line of the slip");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), FORTUNE, "utf8");
}

main();
