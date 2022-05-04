import { JSDOM } from "jsdom";

export const shrinkHtmlScript = (html: string) => {
  const root = new JSDOM(html);
  const document = root.window.document;

  document.querySelectorAll("script").forEach((e) => e.remove());

  return root.serialize();
};
