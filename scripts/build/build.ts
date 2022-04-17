import { ClocInfo, FileInfo, FullPath, LayoutInfo, ProjectStatistics, stacks, SubPath } from "@todo/data";
import { execa } from "execa";
import fs from "fs-extra";
import { globby } from "globby";
import { gzipSize } from "gzip-size";
import md5 from "md5";
import { basename, dirname, join } from "node:path";
import { injectAppHtml } from "./injectAppHtml";

// * ================================================================================ const and type

// const ROOT_DIR = join(process.cwd(), ".");
const ROOT_DIR = join(__dirname, "../../");
const PROJECTS_DIR = join(ROOT_DIR, "examples");
const OUTPUT_DIR = join(ROOT_DIR, "dist");

// * ================================================================================ process

// * -------------------------------- projects statistics

const parseProject = async (projectFullPath: string): Promise<ProjectStatistics> => {
  const distFullPath = (await globby(join(projectFullPath, "{dist,build}/index.html"))).map((e) => dirname(e))[0];

  const { default: meta } = await import(join(projectFullPath, "meta.js"));

  return {
    projName: basename(projectFullPath),
    projRoot: projectFullPath,
    distName: basename(distFullPath),

    cloc: await parseCloc(join(projectFullPath, "src")),
    dist: await parseDist(distFullPath),

    meta,
  };
};

// * -------------------------------- cloc

const parseCloc = async (projFullPath: FullPath): Promise<ClocInfo[]> => {
  const { stdout } = await execa("npx", ["cloc", projFullPath, "--csv", "--quiet"]);
  const result = stdout
    .trim()
    .split("\n")
    .slice(1, -1)
    .map((e) => {
      const [files, type, blank, comment, code] = e.split(",");
      return {
        type,
        files: Number(files),
        blank: Number(blank),
        comment: Number(comment),
        code: Number(code),
      };
    });

  return result;
};

// * -------------------------------- dist

const parseDist = async (distFullPath: FullPath): Promise<FileInfo[]> =>
  await Promise.all(
    (
      await globby("**", { cwd: distFullPath })
    ).map(async (file) => {
      const fullFilePath = join(distFullPath, file);
      const size = (await fs.stat(fullFilePath)).size;
      const gsize = await gzipSize(await fs.readFile(fullFilePath, "utf8"));
      return { file, size, gsize };
    }),
  );

// * -------------------------------- layout props

const genLayoutInfo = (info: ProjectStatistics): LayoutInfo => ({
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

const rebuildSingle = async (projPath: FullPath, injectedCss: SubPath) => {
  const p = await parseProject(projPath);
  const outProjDir = join(OUTPUT_DIR, p.projName);
  const outProjIndex = join(OUTPUT_DIR, p.projName, "index.html");

  await fs.copy(join(p.projRoot, p.distName), outProjDir);

  const info = genLayoutInfo(p);

  await fs.writeFile(outProjIndex, injectAppHtml(await fs.readFile(outProjIndex, "utf8"), injectedCss, info));
};

// * -------------------------------- all

const rebuildAll = async () => {
  await fs.ensureDir(OUTPUT_DIR);
  await fs.emptyDir(OUTPUT_DIR);

  const projectFullPathList = await globby("*/package.json", {
    cwd: PROJECTS_DIR,
  }).then((list) => list.map((e) => dirname(join(PROJECTS_DIR, e))));

  const injectedCss = (await globby(join(ROOT_DIR, "packages/pages/layout/dist/layout.css")))[0];
  const hashedName = md5(await fs.readFile(injectedCss)).slice(-8) + ".css";
  await fs.copy(injectedCss, join(OUTPUT_DIR, hashedName));

  await Promise.all(projectFullPathList.map((p) => rebuildSingle(p, `../${hashedName}`)));
};

// * ================================================================================ run

rebuildAll();
