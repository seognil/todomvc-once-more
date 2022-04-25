// @ts-check

const { readFileSync } = require("fs");
const { join } = require("path");

/** @type import('../../packages/data/src').ProjectMetaRaw */
const meta = {
  title: "React Hooks + Recoil",
  stacks: ["vite", "react-hooks", "recoil", "ts", "sass"],

  desc: "Use multiple atoms to organize state instead of a single store",

  core: ["recoil"],

  usage: {
    lang: "tsx",
    code: ["<RecoilRoot>", "atom()", "selector()", "useRecoilState()"],
    note: [
      "The usage of Recoil simply looks like Redux or Mobx.",
      "But unlike Redux, when implementing multiple sub-systems, you only need one `RecoilRoot` as Provider.",
      "And unlike Mobx, there must be an ancestor of any component that uses any Recoil hooks.",
      "Multiple <RecoilRoot>'s may co-exist and represent independent providers/stores of atom state; atoms will have distinct values within each root.",
    ],
    snippet: readFileSync(join(__dirname, "./concepts.tsx"), "utf-8"),
  },

  resources: [
    "recoil",
    "jotai",
    {
      title: "Jotai vs. Recoil: What are the differences?",
      url: "https://blog.logrocket.com/jotai-vs-recoil-what-are-the-differences/",
    },
    {
      title: "Why doesn’t Recoil manage the unique key in atom and selector",
      url: "https://github.com/facebookexperimental/Recoil/issues/378",
    },
  ],
};

module.exports = meta;
