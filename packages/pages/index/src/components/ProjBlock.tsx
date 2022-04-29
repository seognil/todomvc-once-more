import { ExampleNames, ProjectStatsFull, stats } from "@todo/data";
import type { FunctionalComponent as FC, VNode as ReactElement } from "preact";
import { FaCircle, FaSquare } from "react-icons/fa";
import { DistBar, GzipBar } from "./BarChart";
import { PieChart } from "./PieChart";

// * ================================================================================

const prettySize = (size: number) => (size / 1024).toFixed(2);
const prettyKB = (size: number) => `${prettySize(size)} kB`;

// * ================================================================================

export const ProjBlock: FC = () => {
  const reactList: ExampleNames[] = [
    "vite-react-context",
    "vite-preact-context",
    "vite-react-context-immer",
    "vite-react-redux",
    "vite-react-mobx",
    "vite-react-rxjs",
    "vite-react-recoil",
    "vite-react-jotai",
  ];

  const frameworkList: ExampleNames[] = ["vite-svelte", "vite-solidjs"];

  const allProjects = [...reactList, ...frameworkList];
  const rest = stats.filter((p) => !allProjects.includes(p.projName as ExampleNames));

  return (
    <>
      <ProjListByCate
        list={reactList}
        wait={["Zusland", "Xstate", "resso"]}
        anchor="projects-react"
        title="React Baseline: React Hooks + React Context"
      />

      <ProjListByCate
        list={frameworkList}
        wait={["Preact + Jotai", "Vue3 + Pinia", "Reason", "Elm"]}
        anchor="projects-frameworks"
        title="Framework Baseline: Preact + Jotai"
      />

      <h2 id="projects-styling">
        <a href="#projects-styling">Style Baseline: React + Sass</a>
      </h2>

      <b>Wait List</b>

      <ul>
        <li>React + Sass</li>
        <li>TailwindCSS</li>
        <li>React + UnoCSS</li>
        <li>Vue + UnoCSS</li>
        <li>Twind</li>
        <li>Emotion</li>
      </ul>

      <h2 id="projects-cli">
        <a href="#projects-cli">CLI Baseline: Vite</a>
      </h2>

      <b>Wait List</b>

      <ul>
        <li>Vite</li>
        <li>Create-React-App</li>
        <li>Astro</li>
      </ul>
    </>
  );
};

const getProjs = (list: ExampleNames[]) =>
  list.map((name) => stats.find((p) => p.projName === name)).filter(Boolean) as ProjectStatsFull[];

const ProjListByCate: FC<{ list: ExampleNames[]; wait?: string[]; anchor: string; title: string }> = ({
  list,
  wait,
  anchor,
  title,
}) => {
  return (
    <>
      <h2 id={anchor}>
        <a href={"#" + anchor}>{title}</a>
      </h2>

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
    <div className="w-full flex items-center mb-48px" style={{ "--index": index }}>
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
