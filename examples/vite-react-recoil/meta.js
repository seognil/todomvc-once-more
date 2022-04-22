// @ts-check

const { readFileSync } = require("fs");
const { join } = require("path");

/** @type import('../../packages/data/src').ProjectMetaRaw */
const meta = {
  title: "Vite + React Hooks + Recoil",
  stacks: ["vite", "reacthooks", "recoil", "ts", "css"],
  desc: {
    short: "Use several atoms to organize ui state",
    long: `The usage of Recoil simply looks like Redux or Mobx. But unlike Redux, when implementing multiple sub-systems, you only need one RecoilRoot as Provider. And unlike Mobx, it must be an ancestor of any component that uses any Recoil hooks. Multiple <RecoilRoot>'s may co-exist and represent independent providers/stores of atom state; atoms will have distinct values within each root.`,
  },
  quotes: ["recoil"],
  core: {
    lang: "tsx",
    code: ["<RecoilRoot>", "atom()", "selector()", "useRecoilState()"],
    snippet: readFileSync(join(__dirname, "./concepts.tsx"), "utf-8"),
  },
  resources: [
    "recoil",
    "jotai",
    {
      title: "Jotai vs. Recoil: What are the differences?",
      url: "https://blog.logrocket.com/jotai-vs-recoil-what-are-the-differences/",
    },
  ],
};

module.exports = meta;