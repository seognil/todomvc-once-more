import { ClocInfo, colors, DistType, FileInfo, githubUrl, ProjectStatsFull, stats } from "@todo/data";

import type { FunctionalComponent as FC } from "preact";
import clsx from "clsx";

// * ================================================================================

const clocValMax = stats
  .map((e) => e.cloc.map((e) => e.code))
  .flat()
  .reduce((a, b) => Math.max(a, b));

// * ----------------------------------------------------------------

export const PieChart: FC<{ clocs: ClocInfo[]; className?: string }> = ({ clocs, className }) => {
  const csum = clocs.reduce((a, b) => a + b.code, 0);

  // * ----------------

  let tmp = 0;
  const piesData = clocs.map((e) => {
    const result = {
      color: e.color,
      val: e.code,
      start: tmp / csum,
      percent: e.code / csum,
      type: e.type,
      code: e.code,
    };
    tmp += e.code;
    return result;
  });

  // * ----------------

  const size = 80;
  const [w, h] = [size, size];
  const [x, y] = [w / 2, h / 2];
  const origin = [x, y] as const;
  const r = size / 2;
  const max = clocValMax;

  // * ----------------

  return (
    <svg className={clsx("animate-pie", className)} width="1em" height="1em" viewBox={`0 0 ${w} ${h}`}>
      {piesData
        .map((e, i) => (
          <PiePiece
            key={i}
            val={(r / max) * e.val}
            origin={origin}
            color={e.color}
            start={e.start}
            percent={e.percent}
          />
        ))
        .reverse()}
    </svg>
  );
};

// * ----------------------------------------------------------------

const PiePiece: FC<{
  val: number;
  origin: readonly [number, number];
  color: string;
  start: number;
  percent: number;
}> = ({ val, origin: [x, y], color, start, percent }) => {
  const r = val / 2;
  const c = 2 * Math.PI * r;
  const duration = 600;
  const len = start + percent;

  return (
    <circle
      style={{
        strokeDashoffset: c * len,
        animationDuration: len * duration + `ms`,
      }}
      r={r}
      cx={x}
      cy={y}
      fill="transparent"
      transform={`rotate(-90, ${x}, ${y})`}
      stroke={color}
      stroke-width={r * 2}
      stroke-dasharray={`${c * len} ${c}`}
    />
  );
};
