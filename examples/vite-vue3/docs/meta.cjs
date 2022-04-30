// @ts-check

const { readFileSync } = require("fs");
const { join } = require("path");

/** @type import('../../../packages/data/src').ProjectMetaRaw */
const meta = {
  title: "Vue 3",
  stacks: ["vite", "vue3", "ts", "sass"],

  desc: "",

  core: [],

  usage: {
    lang: "tsx",
    code: [],
    note: [],
    snippet: "",
  },

  resources: [],
};

module.exports = meta;
