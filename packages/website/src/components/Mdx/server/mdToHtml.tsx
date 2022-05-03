import { renderToString } from "react-dom/server.js";
import { createElement } from "react";
import { MdxRemote, parseMd } from "./MdxRemote";

export const mdToHtml = async (str: string) => {
  const result = renderToString(createElement(MdxRemote, { source: await parseMd(str) }));

  return result;
};
