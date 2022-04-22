import fs from "fs-extra";
import { basename, extname, join } from "node:path";

// * ----------------

const globResult = await fs.readdir(join(__dirname, "../node_modules/react-syntax-highlighter/src/languages/prism"));

const list = Object.fromEntries(globResult.map((e) => [basename(e, extname(e)), true]));

// * ----------------

const DIST_FILE = join(__dirname, "../src/syntax-type-list.json");
await fs.ensureFile(DIST_FILE);
await fs.writeFile(DIST_FILE, JSON.stringify(list, null, 2));
