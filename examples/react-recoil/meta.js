// @ts-check
/** @type import('../../packages/data').ProjectMetaRaw */

const meta = {
  title: "React Hooks + Recoil",
  stacks: ["react", "recoil", "ts", "vite"],
  core: ["<RecoilRoot>", "atom()", "selector()", "useRecoilState()"],
  desc: {
    short: "Use several atoms to organize ui state",
    long: "",
  },
  quotes: ['react'],
  references: [
    "jotai",
    {
      title: "Jotai vs. Recoil: What are the differences?",
      url: "https://blog.logrocket.com/jotai-vs-recoil-what-are-the-differences/",
    },
  ],
};

module.exports = meta;
