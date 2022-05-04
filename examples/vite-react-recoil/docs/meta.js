// @ts-check

const { readFileSync } = require("fs");
const { join } = require("path");

/** @type import('../../../packages/data/src').ProjectMetaRaw */
const meta = {
  title: "React Hooks + Recoil",
  stacks: ["vite", "react-hooks", "recoil", "ts", "sass"],

  desc: "Use multiple atoms to organize state instead of a single store",

  core: ["recoil"],

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

  article: readFileSync(join(__dirname, "./article.md"), "utf-8"),
};

module.exports = meta;
