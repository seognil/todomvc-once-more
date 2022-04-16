import fs from "fs-extra";
import { globby } from "globby";
import { gzipSize } from "gzip-size";
import { basename, dirname, join } from "node:path";
import { stacks } from "../../stacks";
import type { LayoutInfo } from "../layout/src/Layout";
import { injectAppHtml } from "./injectAppHtml";

// * ---------------------------------------------------------------- const and type

// const ROOT_DIR = join(process.cwd(), ".");
const ROOT_DIR = join(__dirname, "../../");
const PROJECTS_DIR = join(ROOT_DIR, "examples");
const OUTPUT_DIR = join(ROOT_DIR, "build");

type FullPath = string & {};
type SubPath = string & {};
type BaseName = string & {};
type StackName = string & {};

interface ProjectInfo {
  projRoot: FullPath;
  projName: BaseName;
  distName: BaseName;
  files: { size: number; gsize: number; file: SubPath }[];
  meta: Meta;
}

interface Meta {
  title: string;
  stacks: StackName[];
  desc?: StackName[];
}

// * ---------------------------------------------------------------- projects statistics

const parseProject = async (projectFullPath: string): Promise<ProjectInfo> => {
  const distFullPath = (await globby(join(projectFullPath, "{dist,build}/index.html"))).map((e) => dirname(e)).at(0);

  if (!distFullPath) return null;

  // * ----------------

  const distFiles = await Promise.all(
    (
      await globby("**", { cwd: distFullPath })
    ).map(async (file) => {
      const fullFilePath = join(distFullPath, file);
      const size = (await fs.stat(fullFilePath)).size;
      const gsize = await gzipSize(await fs.readFile(fullFilePath, "utf8"));
      return { file, size, gsize };
    }),
  );

  const meta = await fs.readJSON(join(projectFullPath, "meta.json")).catch(() => ({}));

  return {
    projName: basename(projectFullPath),
    projRoot: projectFullPath,
    distName: basename(distFullPath),
    files: distFiles,
    meta,
  };
};

// * ---------------------------------------------------------------- layout props

const genLayoutInfo = (info: ProjectInfo): LayoutInfo => ({
  backUrl: "../",
  sourceUrl: `https://github.com/seognil/todomvc-once-more/tree/master/examples/${info.projName}`,
  title: info.meta.title,
  dist: info.files,
  stacks: info.meta.stacks.map((e) => stacks[e.toLowerCase()]).filter((e) => e),
  desc: info.meta.desc?.map((e) => stacks[e.toLowerCase()]).filter((e) => e) ?? [],
});

// * ---------------------------------------------------------------- single

const rebuildSingle = async (projPath: FullPath, injectCss: FullPath) => {
  const p = await parseProject(projPath);
  const outProjDir = join(OUTPUT_DIR, p.projName);
  const outProjIndex = join(OUTPUT_DIR, p.projName, "index.html");
  const cssFileName = basename(injectCss);

  await fs.copy(join(p.projRoot, p.distName), outProjDir);
  await fs.copy(injectCss, join(outProjDir, cssFileName));

  await fs.writeFile(
    outProjIndex,
    injectAppHtml(await fs.readFile(outProjIndex, "utf8"), basename(injectCss), genLayoutInfo(p)),
  );
};

// * ---------------------------------------------------------------- all

const rebuildAll = async () => {
  await fs.ensureDir(OUTPUT_DIR);
  await fs.emptyDir(OUTPUT_DIR);

  const projectFullPathList = await globby("*/package.json", {
    cwd: PROJECTS_DIR,
  }).then((list) => list.map((e) => dirname(join(PROJECTS_DIR, e))));

  const injectCss = (await globby(join(ROOT_DIR, "scripts/layout/dist/assets/*.css")))[0];

  await Promise.all(projectFullPathList.map((p) => rebuildSingle(p, injectCss)));
};

// * ---------------------------------------------------------------- run

rebuildAll();
