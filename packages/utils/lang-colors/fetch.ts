import fs from "fs-extra";
import { curly } from "node-libcurl";
import { join } from "node:path";
import { parse } from "yaml";

const TMP_DIR = join(__dirname, `./dist/`);
const COLORS_FILE = join(TMP_DIR, "./colors.json");

const { data } = await curly.get("https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml");

const json = parse(data)
// @ts-ignore
const colors = Object.fromEntries(Object.entries(json).map(([k, v]) => [k, v.color]))

await fs.ensureFile(COLORS_FILE);
await fs.writeFile(COLORS_FILE, JSON.stringify(colors, null, 2));
