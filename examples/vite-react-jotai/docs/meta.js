// @ts-check

const { readFileSync } = require("fs");
const { join } = require("path");

/** @type import('../../../packages/data/src').ProjectMetaRaw */
const meta = {
  title: "Jotai instead of Recoil",
  desc: "Jotai is a Recoil alternative with minimalistic API",

  stacks: ["vite", "react-hooks", "jotai", "ts", "sass"],

  core: ["jotai"],

  resources: [
    "recoil",
    "jotai",
    {
      title: "Jotai vs. Recoil: What are the differences?",
      url: "https://blog.logrocket.com/jotai-vs-recoil-what-are-the-differences/",
    },
  ],

  article: readFileSync(join(__dirname, "./article.md"), "utf-8"),
};

module.exports = meta;
