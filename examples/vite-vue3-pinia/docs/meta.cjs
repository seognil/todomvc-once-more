// @ts-check

const { readFileSync } = require("fs");
const { join } = require("path");

/** @type import('../../../packages/data/src').ProjectMetaRaw */
const meta = {
  title: "Vue 3 + Pinia",
  stacks: ["vite", "vue3", "pinia", "ts", "sass"],

  desc: "",

  core: [],

  resources: [],

  article: readFileSync(join(__dirname, "./article.md"), "utf-8"),
};

module.exports = meta;
