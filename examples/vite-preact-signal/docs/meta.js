// @ts-check

import { readFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

/** @type import('../../../packages/data/src').ProjectMetaRaw */
const meta = {
  title: "@preact/signal",
  desc: "Signals are reactive primitives for managing application state.",

  stacks: ["vite", "preact", "ts", "sass"],

  core: ["preact"],

  resources: [
    {
      title: "Switching to Preact (from React)",
      url: "https://preactjs.com/guide/switching-to-preact",
    },
    {
      title: "Differences to React",
      url: "https://preactjs.com/guide/differences-to-react/",
    },
  ],

  article: readFileSync(join(fileURLToPath(import.meta.url), "../article.md"), "utf-8"),
};

export default meta;
