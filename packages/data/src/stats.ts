import json from "../dist/data.json";
import { stacks } from "./stacks";
import { ProjectStatsFull, ProjectStatsRaw } from "./types";

export const DIR_ROOT = json.root;

const toFull = (p: ProjectStatsRaw): ProjectStatsFull => ({
  ...p,
  meta: {
    ...p.meta,

    stacks: p.meta.stacks.map((e) => stacks[e]),
    core: p.meta.core?.map((e) => stacks[e]) ?? [],
    resources: p.meta.resources?.map((e) => (typeof e === "string" ? stacks[e] : e)) ?? [],
  },
});

export const stats = (json.stats as ProjectStatsRaw[]).map(toFull);

export type ExampleNames = keyof typeof json.names;
