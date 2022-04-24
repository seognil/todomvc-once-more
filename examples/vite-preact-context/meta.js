// @ts-check

const { readFileSync } = require("fs");
const { join } = require("path");

/** @type import('../../packages/data/src').ProjectMetaRaw */
const meta = {
  title: "Vite + Preact",
  stacks: ["vite", "preact", "ts", "sass"],
  desc: {
    short: "Fast 3kB alternative to React with the same modern API",
    long: [
      "Preact is a super small React alternative.",
      "And It works well with most libraries of the React ecosystem which built on top of React Hooks.",
    ],
  },
  quotes: ["preact"],
  core: {
    lang: "tsx",
    code: [
      `import { render } from "preact"`,
      `import type { FunctionalComponent as FC } from "preact"`,
      `import { useState } from "preact/compat"`,
    ],
    snippet: readFileSync(join(__dirname, "./concepts.tsx"), "utf-8"),
  },
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
};

module.exports = meta;
