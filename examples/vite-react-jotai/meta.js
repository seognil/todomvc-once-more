// @ts-check

const { readFileSync } = require("fs");
const { join } = require("path");

/** @type import('../../packages/data/src').ProjectMetaRaw */
const meta = {
  title: "Jotai instead of Recoil",
  stacks: ["vite", "react-hooks", "jotai", "ts", "sass"],
  desc: {
    short: "Jotai is a Recoil alternative with minimalistic API",
    long: [
      "Jotai's design principles are similar to Recoil's: high performance by preventing extra re-render with simple API. But Jotai is way simpler",
      "But there are some differences. Jotai doesn't have a thing like RecoilRoot as an App wrapper, all state is globally accessible. And Recoil has more powerful utils such as 'atomFamily' and 'Snapshots' which Jotai lacks.",
    ],
  },
  quotes: ["jotai"],
  core: {
    lang: "tsx",
    code: ["atom()", "useAtom()"],
    snippet: readFileSync(join(__dirname, "./concepts.tsx"), "utf-8"),
  },
  resources: [
    "jotai",
    "recoil",
    {
      title: "Jotai vs. Recoil: What are the differences?",
      url: "https://blog.logrocket.com/jotai-vs-recoil-what-are-the-differences/",
    },
  ],
};

module.exports = meta;
