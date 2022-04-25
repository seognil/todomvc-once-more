// @ts-check

const { readFileSync } = require("fs");
const { join } = require("path");

/** @type import('../../packages/data/src').ProjectMetaRaw */
const meta = {
  title: "Immer.js and immutability",
  desc: "Immer simplifies handling immutable data structures",

  stacks: ["vite", "react-hooks", "immer", "ts", "sass"],

  core: ["immer"],

  usage: {
    lang: "tsx",
    code: ["produce()", "enableES5()"],
    note: [
      "One sentence introduction, the author of Immer also created Mobx",
      "The basic idea is that with Immer you will apply all your changes to a temporary draft, which is a proxy of the currentState. Once all your mutations are completed, Immer will produce the nextState based on the mutations to the draft state. This means that you can interact with your data by simply modifying it while keeping all the benefits of immutable data.",
    ],
    snippet: readFileSync(join(__dirname, "./concepts.tsx"), "utf-8"),
  },

  resources: ["mobx"],
};

module.exports = meta;
