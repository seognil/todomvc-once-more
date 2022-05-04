import { FileTypeSum, stats } from "@/data";
import type { FC } from "react";

// * ================================================================================

const sumMax = stats.map((e) => e.dist.map((e) => e.size).reduce((a, b) => a + b, 0)).reduce((a, b) => Math.max(a, b));

// * ----------------------------------------------------------------

export const DistBar: FC<{ files: FileTypeSum[] }> = ({ files }) => {
  const sum = files.map((e) => e.size).reduce((a, b) => a + b, 0);

  let tmp = 0;
  const distData = files.map((e) => {
    const result = { color: e.color, start: tmp / sum, percent: e.size / sum };
    tmp += e.size;
    return result;
  });

  const maxWidthPercent = sum / sumMax;
  const width = maxWidthPercent * 100 + "%";

  return (
    <div className="flex animate-bar" style={{ width }}>
      <svg>
        {distData.map((e, i) => (
          <BarPiece key={i} color={e.color} start={e.start} percent={e.percent} />
        ))}
      </svg>
    </div>
  );
};

// * ----------------------------------------------------------------

export const GzipBar: FC<{ files: FileTypeSum[] }> = ({ files }) => {
  const sum = files.map((e) => e.size).reduce((a, b) => a + b, 0);
  const gsum = files.map((e) => e.gsize).reduce((a, b) => a + b, 0);

  // * ----------------

  let tmp = 0;
  const gzipData = files.map((e) => {
    const result = { color: e.color, start: tmp / gsum, percent: e.gsize / gsum };
    tmp += e.gsize;
    return result;
  });

  // * ----------------

  const maxWidthPercent = sum / sumMax;
  const gRatio = gsum / sum;
  const width = gRatio * maxWidthPercent * 100 + "%";

  // * ----------------

  return (
    <div className="flex animate-bar" style={{ width }}>
      <svg>
        {gzipData.map((e, i) => (
          <BarPiece key={i} color={e.color} start={e.start} percent={e.percent} />
        ))}
      </svg>
    </div>
  );
};

// * ----------------------------------------------------------------

const BarPiece: FC<{
  color: string;
  start: number;
  percent: number;
}> = ({ color, start, percent }) => {
  return <rect x={start * 100 + "%"} width={percent * 100 + "%"} height="100%" rx="2" fill={color} />;
};
