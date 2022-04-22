import type { FullPath, LayoutData, LinkUrl, ProjectStatsFull, SubPath } from "@todo/data";
import { Layout, prettyCodeBlock } from "@todo/pages-layout";
import { JSDOM } from "jsdom";
import { createElement } from "react";
import { renderToString } from "react-dom/server";

// * ================================================================================

export interface InjectConfig {
  outDir: (p: ProjectStatsFull) => FullPath;
  baseUrl: (p: ProjectStatsFull) => LinkUrl;
  backUrl: SubPath;
  css: SubPath;
  favicon: SubPath;
  title: (str: string) => string;
}

// * ================================================================================

export const injectExampleHtml = (html: string, data: LayoutData, inject: InjectConfig) => {
  const root = new JSDOM(html);
  const document = root.window.document;
  const { head, body } = document;

  const layoutBody = new JSDOM(renderToString(createElement(Layout, { data, server: true }, null))).window.document
    .body;

  prettyCodeBlock(layoutBody, document);

  // * ---------------- head

  head.querySelectorAll("link").forEach((link) => {
    link.getAttribute("href")?.startsWith("/") && link.setAttribute("href", link.getAttribute("href").slice(1));
  });

  head.querySelectorAll("script").forEach((script) => {
    script.getAttribute("src")?.startsWith("/") && script.setAttribute("src", script.getAttribute("src").slice(1));
  });

  const css = document.createElement("link");
  css.setAttribute("rel", "stylesheet");
  css.setAttribute("href", inject.css);

  const title = document.head.querySelector("title") ?? document.createElement("title");
  title.textContent = inject.title(data.stats.meta.title);

  const favicon = document.head.querySelector("link[rel='icon']") ?? document.createElement("link");
  favicon.setAttribute("rel", "icon");
  favicon.setAttribute("href", inject.favicon);

  const base = document.head.querySelector("base") ?? document.createElement("base");
  base.setAttribute("href", data.baseUrl);

  head.prepend(base, title, favicon, css);

  // * ---------------- body

  layoutBody.querySelector("#todomvc-inject-app-container").innerHTML = body.innerHTML;
  body.innerHTML = layoutBody.innerHTML;

  // * ---------------- return

  return root.serialize();
};
