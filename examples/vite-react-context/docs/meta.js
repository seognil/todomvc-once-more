// @ts-check

const { readFileSync } = require("fs");
const { join } = require("path");

/** @type import('../../../packages/data/src').ProjectMetaRaw */
const meta = {
  title: "React Hooks + React Context",
  desc: "React without any third-party state management libraries",

  stacks: ["vite", "react-hooks", "ts", "sass"],

  core: ["vite", "react-hooks"],

  usage: {
    lang: "tsx",
    code: ["useState()", "useContext()", "<MyContext.Provider value={}>"],
    note: [
      "Basic usage of React Functional Components with built-in Hooks and Context API.",
      "It's simple, but there is a problem, once the context changes, all components will be re-rendered by default. It's trivial to do the performance optimization manually or split the model/domain layer in large projects.",
      "That's why third-party libraries appear to solve these pain points.",
    ],
    snippet: readFileSync(join(__dirname, "./concepts.tsx"), "utf-8"),
  },

  resources: [
    {
      title: "How Are Function Components Different from Classes?",
      url: "https://overreacted.io/how-are-function-components-different-from-classes/",
    },
    {
      title: "React as a UI Runtime",
      url: "https://overreacted.io/react-as-a-ui-runtime/",
    },
  ],
};

module.exports = meta;
