import { DIR_ROOT, LayoutInfo, ProjectStatistics, stacks, statistics, SubPath } from "@todo/data";
import fs from "fs-extra";
import { globby } from "globby";
import md5 from "md5";
import { join } from "node:path";
import { injectAppHtml } from "./injectAppHtml";

// * ================================================================================ const and type

const DIR_OUTPUT = join(DIR_ROOT, "./dist");
const DIR_LAYOUT = join(DIR_ROOT, "./packages/pages/layout");

// * ================================================================================ data process

// * -------------------------------- layout props

const toLayoutInfo = (info: ProjectStatistics): LayoutInfo => ({
  backUrl: "../",
  githubUrl: `https://github.com/seognil/todomvc-once-more`,

  title: info.meta.title,
  sourceUrl: `https://github.com/seognil/todomvc-once-more/tree/master/examples/${info.projName}`,
  cloc: info.cloc,
  dist: info.dist,

  stacks: info.meta.stacks.map((e) => stacks[e]),
  core: info.meta.core,

  desc: info.meta.desc,
  quotes: info.meta.quotes.map((e) => stacks[e]),
  references: info.meta.references.map((e) => (typeof e === "string" ? stacks[e] : e)),
});

// * ================================================================================ tasks

// * -------------------------------- single

const rebuildSingle = async (p: ProjectStatistics, injectedCss: SubPath) => {
  const outProjDir = join(DIR_OUTPUT, p.projName);
  const outProjIndex = join(DIR_OUTPUT, p.projName, "index.html");

  await fs.copy(join(p.projRoot, p.distName), outProjDir);

  const info = toLayoutInfo(p);

  await fs.writeFile(outProjIndex, injectAppHtml(await fs.readFile(outProjIndex, "utf8"), injectedCss, info));
};

// * -------------------------------- all

const rebuildAll = async () => {
  await fs.ensureDir(DIR_OUTPUT);
  await fs.emptyDir(DIR_OUTPUT);

  const injectedCss = (await globby(join(DIR_LAYOUT, "./dist/layout.css")))[0];
  const cssFileName = md5(await fs.readFile(injectedCss)).slice(-8) + ".css";
  await fs.copy(injectedCss, join(DIR_OUTPUT, cssFileName));

  await Promise.all(statistics.map((p) => rebuildSingle(p, `../${cssFileName}`)));
};

// * ================================================================================ run

rebuildAll();
