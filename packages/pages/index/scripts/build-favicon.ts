import fs from "fs-extra";
import { join } from "node:path";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { FcTodoList } from "react-icons/fc/index.js";

const svgContent = renderToString(createElement(FcTodoList));

const svgPath = join(__dirname, "../src/favicon.svg");
await fs.ensureFile(svgPath);
await fs.writeFile(svgPath, svgContent);

export {};
