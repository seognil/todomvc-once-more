import json from "../dist/data.json";
import { stacks } from "./stacks";
import { ProjectStatsFull, ProjectStatsRaw } from "./types";

export const DIR_ROOT = json.root;

const toFull = (p: ProjectStatsRaw): ProjectStatsFull => ({
  ...p,
  meta: {
    title: p.meta.title,

    stacks: p.meta.stacks.map((e) => stacks[e]),
    core: p.meta.core ?? [],

    desc: p.meta.desc,
    quotes: p.meta.quotes.map((e) => stacks[e]),
    resources: p.meta.resources.map((e) => (typeof e === "string" ? stacks[e] : e)),
  },
});

export const stats = (json.stats as ProjectStatsRaw[]).map(toFull);
