import { ClocInfo, stats } from "@/data";
import clsx from "clsx";
import type { FC } from "react";

// * ================================================================================

const csumMax = stats.map((e) => e.cloc.reduce((a, b) => a + b.code, 0)).reduce((a, b) => Math.max(a, b));

// * ----------------------------------------------------------------

export const PieChart: FC<{ clocs: ClocInfo[]; className?: string }> = ({ clocs, className }) => {
  const csum = clocs.reduce((a, b) => a + b.code, 0);
  const localMax = Math.max(...clocs.map((e) => e.code));

  // * ----------------

  const size = 200;
  const [w, h] = [size, size];
  const [x, y] = [w / 2, h / 2];
  const origin = [x, y] as const;

  const minr = 0.4;
  const getRadius = (val: number) => ((val / localMax) ** 0.8 * (1 - minr) + minr) * (size / 2) * (csum / csumMax);

  // * ----------------

  let tmp = 0;
  const piesData = clocs.map((e) => {
    const result = {
      color: e.color,
      val: getRadius(e.code),
      start: tmp / csum,
      percent: e.code / csum,
      type: e.type,
      code: e.code,
    };
    tmp += e.code;
    return result;
  });

  // * ----------------

  return (
    <svg className={clsx("animate-pie", className)} width="1em" height="1em" viewBox={`0 0 ${w} ${h}`}>
      {piesData
        .map((e, i) => (
          <PiePiece key={i} val={e.val} origin={origin} color={e.color} start={e.start} percent={e.percent} />
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
      strokeWidth={r * 2}
      strokeDasharray={`${c * len} ${c}`}
    />
  );
};
