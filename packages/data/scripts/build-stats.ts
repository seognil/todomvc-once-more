import { execa } from "execa";
import { findUp } from "find-up";
import fs from "fs-extra";
import { globby } from "globby";
import { gzipSize } from "gzip-size";
import { basename, dirname, join } from "node:path";
import { colors } from "../src/colors";
import { ClocInfo, DistType, FileInfo, FileTypeSum, FullPath, ProjectStatsRaw } from "../src/types";

// * ================================================================================ const and type

type ColorType = keyof typeof colors;

const getColor = (type: string): string => colors[type as ColorType] ?? "#bfbfbf";

// * ================================================================================ process

// * -------------------------------- analyze projects statistics

export const analyzeSingleExample = async (examplePath: FullPath): Promise<ProjectStatsRaw | null> => {
  const distFullPath = (await globby(join(examplePath, "{dist,build}/index.html"))).map((e) => dirname(e))[0] ?? null;

  const metaFile = (await globby(join(examplePath, "docs/meta.{js,cjs,mjs}")))[0];

  const meta = metaFile ? (await import(metaFile)).default : {};

  const dist = distFullPath ? await analyzeDist(distFullPath) : [];
  const distTypeSum = getDistTypeSum(dist);

  return {
    projName: basename(examplePath),
    projRoot: examplePath,
    distName: distFullPath && basename(distFullPath),

    cloc: await analyzeCloc(join(examplePath, "src")),
    dist,
    distTypeSum,

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
      const [files, clocType, blank, comment, code] = e.split(",") as [string, string, string, string, string];

      const mappedType = { "Vuejs Component": "Vue" }[clocType] ?? clocType;

      const type = mappedType in colors ? mappedType : "Other";

      return {
        type: type,
        color: getColor(type),
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
    ).map(async (name) => {
      const fullFilePath = join(distFullPath, name);
      const size = (await fs.stat(fullFilePath)).size;
      const gsize = await gzipSize(await fs.readFile(fullFilePath, "utf8"));

      const ext = name.match(/(?<=(\.))\w+(\.map)?$/)?.[0] ?? "";
      const type = (
        /\.map$/.test(ext) ? "SourceMap" : { js: "JavaScript", css: "CSS", html: "HTML" }[ext] ?? "Other"
      ) as DistType;

      const color = getColor(type);

      return { name, ext, type, color, size, gsize };
    }),
  );

// * ------------------------------------------------

const getDistTypeSum = (dist: FileInfo[]) => {
  return (["HTML", "CSS", "JavaScript", "Other"] as DistType[])
    .map((type) =>
      dist
        .filter((e) => e.type === type)
        .reduce(
          (a, e) => ({
            ...a,
            files: a.files + 1,
            size: a.size + e.size,
            gsize: a.size + e.gsize,
          }),
          {
            type,
            files: 0,
            color: getColor(type),
            size: 0,
            gsize: 0,
          } as FileTypeSum,
        ),
    )
    .filter((e) => e.files > 0);
};

// * ================================================================================ search and run

const DIR_ROOT = dirname((await findUp("pnpm-workspace.yaml"))!);
const DIR_EXAMPLES = join(DIR_ROOT, "./examples");

const DATA_FILE_PATH = join(__dirname, "../dist/data.json");

const main = async () => {
  const examples: FullPath[] = await globby("*/package.json", { cwd: DIR_EXAMPLES }).then((list) =>
    list.map((e) => dirname(join(DIR_EXAMPLES, e))),
  );

  const analyzeResult = await Promise.all(examples.map((e) => analyzeSingleExample(e)));

  const names = Object.fromEntries(analyzeResult.map((e) => [e?.projName, true]));

  const json = {
    root: DIR_ROOT,
    names: names,
    stats: analyzeResult,
  };

  await fs.ensureFile(DATA_FILE_PATH);
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(json, null, 2));
};

main();
