import { Layout, prettyCodeBlock } from "layout";
import { parse } from "node-html-parser";
import { createElement } from "react";
import * as ReactDOMServer from "react-dom/server";

// * ----------------------------------------------------------------

export const injectAppHtml = (html: string, injectCssName: string, info = null) => {
  const root = parse(html);

  const fullHtmlMode = root.querySelector("head") !== null;

  const injectCss = (head: ReturnType<typeof parse>) =>
    injectCssName && head.appendChild(parse(`<link rel="stylesheet" href="${injectCssName}">`));

  const layoutNode = parse(
    //
    ReactDOMServer.renderToString(createElement(Layout, { info, server: true }, null)),
    { blockTextElements: { code: true } },
  );

  // @ts-ignore
  prettyCodeBlock(layoutNode);

  if (fullHtmlMode) {
    // * -------------------------------- while full html

    // * head
    injectCss(root.querySelector("head"));

    // * body
    const body = root.querySelector("body");
    const appBodyStr = body.innerHTML;
    body.innerHTML = layoutNode.toString();
    body.querySelector("#todomvc-inject-app-container").innerHTML = appBodyStr;

    // * return
    return root.toString();
  } else {
    // * -------------------------------- while partial html

    // * analyze app html
    // @ts-ignore
    const appNonBodyNodes = root.childNodes.filter((e) => ["link", "script"].includes(e.rawTagName));
    // @ts-ignore
    const appBodyNodes = root.childNodes.filter((e) => !["link", "script"].includes(e.rawTagName));

    // * head
    const head = parse(`<head></head>`);
    appNonBodyNodes.forEach((e) => head.appendChild(e));
    injectCss(head);

    // * body
    const body = parse(`<body></body>`);
    body.appendChild(layoutNode);
    body.querySelector("#todomvc-inject-app-container").innerHTML = appBodyNodes.map((e) => e.toString()).join("");

    // * return
    const fullHtml = head.toString() + body.toString();
    return fullHtml;
  }
};
