// @ts-check

const { readFileSync } = require("fs");
const { join } = require("path");

/** @type import('../../packages/data/src').ProjectMetaRaw */
const meta = {
  title: "React Hooks + redux (core) + react-redux",
  desc: "State management in the early ages",

  stacks: ["vite", "react-hooks", "redux", "react-redux", "ts", "sass"],

  core: ["redux", "react-redux"],

  usage: {
    lang: "tsx",
    code: ["createStore()", "<Provider>", "useSelector()", "useDispatch()"],
    note: [
      "In the early days of React UI development, there were not many choices for state management, Redux was the de facto standard library and everyone know it.",
      "But when people realize it's annoying to write a lot of boilerplate for data layers in complex projects with redux. They often use it with other tools (like `redux-actions`) as well or wrap the redux core API with custom handmade utils.",
    ],
    snippet: readFileSync(join(__dirname, "./concepts.tsx"), "utf-8"),
  },

  resources: ["redux-toolkit"],
};

module.exports = meta;
