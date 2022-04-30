// @ts-check

const { readFileSync } = require("fs");
const { join } = require("path");

/** @type import('../../../packages/data/src').ProjectMetaRaw */
const meta = {
  title: "Solid.js",
  stacks: ["vite", "solid", "ts", "sass"],

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
