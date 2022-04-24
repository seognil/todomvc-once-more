// @ts-check

const { readFileSync } = require("fs");
const { join } = require("path");

/** @type import('../../packages/data/src').ProjectMetaRaw */
const meta = {
  title: "React Hooks + redux (core) + react-redux",
  stacks: ["vite", "react-hooks", "redux", "react-redux", "ts", "sass"],
  desc: {
    short: "State management in the early ages",
    long: [
      "In the early days of React UI development, there were not many choices for state management, Redux was the de facto standard library and everyone know it.",
      "But when people realize it's annoying to write a lot of boilerplate for data layers in complex projects with redux. They often use it with other tools (like `redux-actions`) as well or wrap the redux core APIs with custom handmade utils.",
    ],
  },
  quotes: ["redux", "react-redux"],
  core: {
    lang: "tsx",
    code: ["createStore()", "<Provider>", "useSelector()", "useDispatch()"],
    snippet: readFileSync(join(__dirname, "./concepts.tsx"), "utf-8"),
  },
  resources: ["redux-toolkit"],
};

module.exports = meta;
