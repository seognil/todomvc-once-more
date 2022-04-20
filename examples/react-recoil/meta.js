// @ts-check
/** @type import('../../packages/data').ProjectMetaRaw */

const meta = {
  title: "Vite + React Hooks + Recoil",
  stacks: ["vite", "reacthooks", "recoil", "ts", "css"],
  core: ["<RecoilRoot>", "atom()", "selector()", "useRecoilState()"],
  desc: {
    short: "Use several atoms to organize ui state",
    long: "",
  },
  quotes: ["recoil"],
  references: [
    "jotai",
    {
      title: "Jotai vs. Recoil: What are the differences?",
      url: "https://blog.logrocket.com/jotai-vs-recoil-what-are-the-differences/",
    },
  ],
};

module.exports = meta;
