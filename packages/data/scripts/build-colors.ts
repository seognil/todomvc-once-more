import fs from "fs-extra";
import { curly } from "node-libcurl";
import { join } from "node:path";
import { parse } from "yaml";

// * ----------------

const { data } = await curly.get("https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml");

const json = parse(data);
// @ts-ignore
const colors = Object.fromEntries(Object.entries(json).map(([k, v]) => [k, v.color]));

// * ----------------

const DIST_FILE = join(__dirname, "../src/colors.json");
await fs.ensureFile(DIST_FILE);
await fs.writeFile(DIST_FILE, JSON.stringify(colors, null, 2));
