import { execa } from "execa";
import { findUp } from "find-up";
import fs from "fs-extra";
import { globby } from "globby";
import { gzipSize } from "gzip-size";
import { basename, dirname, join } from "node:path";
import { ClocInfo, FileInfo, FullPath, ProjectStatistics } from "../src";

// * ================================================================================ const and type

const DIR_ROOT = dirname((await findUp("pnpm-workspace.yaml"))!);
const DIR_EXAMPLES = join(DIR_ROOT, "./examples");

const DATA_FILE_PATH = join(__dirname, "../dist/data.json");

// * ================================================================================ process

// * -------------------------------- analyze projects statistics

export const analyzeSingleExample = async (examplePath: FullPath): Promise<ProjectStatistics | null> => {
  const distFullPath = (await globby(join(examplePath, "{dist,build}/index.html"))).map((e) => dirname(e))[0] ?? null;

  const { default: meta } = await import(join(examplePath, "meta.js"));

  return {
    projName: basename(examplePath),
    projRoot: examplePath,
    distName: distFullPath && basename(distFullPath),

    cloc: await analyzeCloc(join(examplePath, "src")),
    dist: distFullPath ? await analyzeDist(distFullPath) : [],

    meta,
  };
};

// * -------------------------------- analyze cloc

const analyzeCloc = async (projFullPath: FullPath): Promise<ClocInfo[]> => {
  const { stdout } = await execa("npx", ["cloc", projFullPath, "--csv", "--quiet"]);
  const result = stdout
    .trim()
    .split("\n")
    .slice(1, -1)
    .map((e) => {
      const [files, type, blank, comment, code] = e.split(",") as [string, string, string, string, string];
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

// * -------------------------------- analyze dist

const analyzeDist = async (distFullPath: FullPath): Promise<FileInfo[]> =>
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

// * ================================================================================ search and run

const main = async () => {
  const examples: FullPath[] = await globby("*/package.json", { cwd: DIR_EXAMPLES }).then((list) =>
    list.map((e) => dirname(join(DIR_EXAMPLES, e))),
  );

  const analyzeResult = await Promise.all(examples.map((e) => analyzeSingleExample(e)));

  const json = {
    root: DIR_ROOT,
    statistics: analyzeResult,
  };

  await fs.ensureFile(DATA_FILE_PATH);
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(json, null, 2));
};

main();
