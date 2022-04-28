// @ts-check

const { readFileSync } = require("fs");
const { join } = require("path");

/** @type import('../../../packages/data/src').ProjectMetaRaw */
const meta = {
  title: "Svelte + svelte/store",
  stacks: ["vite", "svelte", "recoil", "ts", "sass"],

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
