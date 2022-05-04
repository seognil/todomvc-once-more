// @ts-check

const { readFileSync } = require("fs");
const { join } = require("path");

/** @type import('../../../packages/data/src').ProjectMetaRaw */
const meta = {
  title: "Immer.js and immutability",
  desc: "Immer.js simplifies handling immutable data structures",

  stacks: ["vite", "react-hooks", "immer", "ts", "sass"],

  core: ["immer"],
  resources: ["mobx"],

  article: readFileSync(join(__dirname, "./article.md"), "utf-8"),
};

module.exports = meta;
