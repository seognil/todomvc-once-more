// @ts-check

const { readFileSync } = require("fs");
const { join } = require("path");

/** @type import('../../packages/data/src').ProjectMetaRaw */
const meta = {
  title: "Vite + React Hooks + React Context",
  stacks: ["vite", "reacthooks", "ts", "sass"],
  desc: {
    short: "React without any third-party state management libraries",
    long: `Basic usage of React Functional Components with Hooks and Context API. It's simple, but there is a problem, once the context changes, all components will be re-rendered. It's trivial to manage the performance optimization manually and split the model/domain layer in large projects. That's why third-party libraries appear to solve pain points`,
  },
  quotes: ["reacthooks"],
  core: {
    lang: "tsx",
    code: ["<MyContext.Provider value={}>", "useContext()", "useState()"],
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
