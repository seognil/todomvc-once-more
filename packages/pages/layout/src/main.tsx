import React from "react";
import ReactDOM from "react-dom";
import { Layout } from "./Layout";
import { MockData } from "./mockData";
import "./style.scss";

// * ---------------------------------------------------------------- dev render

ReactDOM.render(
  <React.StrictMode>
    <Layout data={MockData} />
  </React.StrictMode>,
  document.getElementById("app")!,
);
