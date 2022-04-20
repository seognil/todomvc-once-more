import { DistType, FileInfo, ProjectStatsFull, stats } from "@todo/data";
import type { FunctionalComponent as FC, VNode as ReactElement } from "preact";
import { FaCircle, FaSquare } from "react-icons/fa";
import { DistBar, GzipBar } from "./BarChart";
import { PieChart } from "./PieChart";

// * ================================================================================

const prettySize = (size: number) => (size / 1024).toFixed(2);
const prettyKB = (size: number) => `${prettySize(size)} kB`;

// * ================================================================================

export const ProjBlock: FC = () => {
  return (
    <div>
      {stats.map((e, i) => (
        <ProjListBlock key={e.projName} p={e} index={i} />
      ))}
    </div>
  );
};

const ProjListBlock: FC<{ p: ProjectStatsFull; index: number }> = ({ p, index }) => {
  return (
    <div className="w-full flex items-center mb-48px" style={{ "--index": index }}>
      <div className="w-30% min-w-200px">
        <div className="pr-32px">
          <a className="font-bold text-20px" href={`./${p.projName}`}>
            <span className="font-bold">{p.meta.title}</span>
          </a>

          <p className="leading-1em mt-8px mb-0 text-14px font-light opacity-60">{p.meta.desc.short}</p>

          <div className="mt-8px text-14px font-light opacity-60">
            <span>Full Stacks: </span>
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

  const files = (["JavaScript", "CSS", "HTML", "Other"] as DistType[])
    .reverse()
    .map((type) => p.dist.find((e) => e.type === type) ?? null)
    .filter((e) => e) as FileInfo[];

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
