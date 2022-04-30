import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { TodoApp } from "./TodoApp";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <TodoApp />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("app"),
);
