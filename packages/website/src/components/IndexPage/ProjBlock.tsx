import { ExampleNames, ProjectStatsFull, stats } from "@/data";
import type { FC, ReactElement } from "react";
import { FaCircle, FaSquare } from "react-icons/fa";
import { H2 } from "../Mdx/MdxConfig";
import { DistBar, GzipBar } from "./BarChart";
import { PieChart } from "./PieChart";

// * ================================================================================

const prettySize = (size: number) => (size / 1024).toFixed(2);
const prettyKB = (size: number) => `${prettySize(size)} kB`;

// * ================================================================================

export const ProjBlock: FC = () => {
  const frameworkList: ExampleNames[] = [
    "vite-react-context",
    "vite-preact-context",
    "vite-vue3",
    "vite-vue3-pinia",
    "vite-svelte",
    "vite-solidjs",
  ];

  const reactList: ExampleNames[] = [
    "vite-react-context-immer",
    "vite-react-redux",
    "vite-react-mobx",
    "vite-react-rxjs",
    "vite-react-recoil",
    "vite-react-jotai",
  ];

  const preactList: ExampleNames[] = [
    "vite-preact-context",
    "vite-preact-signal",
    "vite-preact-signal-optimized",
    "vite-preact-signal-with-immer",
  ];

  const allProjects = [...reactList, ...frameworkList];
  const rest = stats.filter((p) => !allProjects.includes(p.projName as ExampleNames));

  return (
    <>
      <ProjListByCate
        list={frameworkList}
        wait={["Vue 2", "Vue 2 + Vuex", "Angular", "Flutter", "Vanilla", "Reason", "Elm"]}
        title="Frameworks"
      />

      <ProjListByCate list={reactList} wait={["Zusland", "Xstate", "resso"]} title="React and Libraries" />

      <ProjListByCate list={preactList} title="Preact" />

      <ProjListByCate
        list={[]}
        wait={["React + Sass", "TailwindCSS", "React + UnoCSS", "Vue + UnoCSS", "Twind", "Emotion"]}
        title="Styling"
      />

      <ProjListByCate list={[]} wait={["Vite", "Create-React-App", "Vue CLI", "Astro"]} title="CLI Comparation" />

      <ProjListByCate list={rest} title="Others" />
    </>
  );
};

const getProjs = (list: ExampleNames[] | ProjectStatsFull[]) =>
  list.map((name) => stats.find((p) => p.projName === name)).filter(Boolean) as ProjectStatsFull[];

const ProjListByCate: FC<{
  list: ExampleNames[] | ProjectStatsFull[];
  wait?: string[];

  title: string;
}> = ({ list, wait, title }) => {
  const notEmpty = list.length > 0 || (wait && wait?.length > 0);
  if (!notEmpty) return null;

  return (
    <>
      <H2>{title}</H2>

      <div>
        {getProjs(list).map((p, i) => (
          <ProjListItem key={p.projName} p={p} index={i} />
        ))}
      </div>

      {(wait?.length ?? 0) > 0 && (
        <>
          <b>Wait List</b>

          <ul>
            {wait?.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

const ProjListItem: FC<{ p: ProjectStatsFull; index: number }> = ({ p, index }) => {
  return (
    <div
      className="w-full flex items-center mb-48px"
      style={{
        // @ts-ignore
        "--index": index,
      }}
    >
      <div className="w-40% min-w-200px">
        <div className="pr-32px">
          <a className="font-bold text-20px" href={`/examples/${p.projName}`}>
            <span className="font-bold">{p.meta.title}</span>
          </a>

          <p className="leading-1em mt-8px mb-0 text-14px font-light opacity-60">{p.meta.desc}</p>

          <div className="mt-8px text-14px font-light opacity-60">
            <span>Full Stack: </span>
            {p.meta.stacks
              .map((e) => (
                <a href={e.url}>
                  <span className="whitespace-nowrap">{e.name}</span>
                </a>
              ))
              .reduce(
                (a, e) => (a.length === 0 ? [e] : (a.concat([<span>, </span>, e]) as ReactElement[])),
                [] as ReactElement[],
              )}
          </div>
        </div>
      </div>

      <ProjVis p={p} />
    </div>
  );
};

// * ----------------------------------------------------------------

const ProjVis: FC<{ p: ProjectStatsFull }> = ({ p }) => {
  const srcs = p.cloc.sort((a, b) => b.code - a.code);

  const files = p.distTypeSum;

  const sum = files.map((e) => e.size).reduce((a, b) => a + b, 0);
  const gsum = files.map((e) => e.gsize).reduce((a, b) => a + b, 0);

  return (
    <div className="flex-1 text-12px font-semibold project-visualization">
      <div className="flex items-center">
        <span className="font-bold">Source lines of code:</span>

        {srcs.map((e, i) => (
          <LangTag key={i} icon={FaCircle} color={e.color} type={e.type} val={e.code} />
        ))}
      </div>

      <div className="flex items-center">
        <PieChart className="text-60px mr-20px" clocs={srcs} />

        <div className="flex flex-col flex-1">
          <div className="flex items-center">
            <span className="shrink-0 w-100px text-right mr-8px">Dist: {prettyKB(sum)}</span>
            <div className="flex w-full h-4px">
              <DistBar files={files} />
            </div>
          </div>

          <div className="flex items-center mt-8px">
            <span className="shrink-0 w-100px text-right mr-8px">Gzip: {prettyKB(gsum)}</span>
            <div className="flex w-full h-12px">
              <GzipBar files={files} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <span className="font-bold">Gzip Build:</span>

        {files.map((e, i) => (
          <LangTag key={i} icon={FaSquare} color={e.color} type={e.type} val={prettyKB(e.gsize)} />
        ))}
      </div>
    </div>
  );
};

// * ----------------------------------------------------------------

const LangTag: FC<{ icon: FC<any>; color: string; type: string; val: string | number }> = ({
  icon: Icon,
  color,
  type,
  val,
}) => (
  <span className="inline-flex items-center m-8px text-12px font-semibold">
    <Icon style={{ color }} />
    <span className="mx-0.5em">{type}</span>
    <span className="opacity-40">{val}</span>
  </span>
);
