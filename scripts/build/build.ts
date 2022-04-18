import { DIR_ROOT, githubUrl, LayoutData, ProjectStatsFull, stats, SubPath } from "@todo/data";
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

const toLayoutData = (stats: ProjectStatsFull): LayoutData => ({
  backUrl: "../",
  githubUrl,
  sourceUrl: `${githubUrl}/tree/master/examples/${stats.projName}`,

  stats,
});

// * ================================================================================ tasks

// * -------------------------------- single

const rebuildSingle = async (p: ProjectStatsFull, injectedCss: SubPath) => {
  const outProjDir = join(DIR_OUTPUT, p.projName);
  const outProjIndex = join(DIR_OUTPUT, p.projName, "index.html");

  await fs.copy(join(p.projRoot, p.distName), outProjDir);

  const data = toLayoutData(p);

  await fs.writeFile(outProjIndex, injectAppHtml(await fs.readFile(outProjIndex, "utf8"), injectedCss, data));
};

// * -------------------------------- all

const rebuildAll = async () => {
  await fs.ensureDir(DIR_OUTPUT);
  await fs.emptyDir(DIR_OUTPUT);

  const injectedCss = (await globby(join(DIR_LAYOUT, "./dist/layout.css")))[0];
  const cssFileName = md5(await fs.readFile(injectedCss)).slice(-8) + ".css";
  await fs.copy(injectedCss, join(DIR_OUTPUT, cssFileName));

  await Promise.all(stats.map((p) => rebuildSingle(p, `../${cssFileName}`)));
};

// * ================================================================================ run

rebuildAll();
