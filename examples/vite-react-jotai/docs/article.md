## Basic Usage

- `atom()`
- `useAtom()`

Jotai's design principles are similar to Recoil's: using simple API to achieve high performance by preventing extra re-render. But Jotai is way simpler.

But there are some differences. Jotai doesn't have a concept like `RecoilRoot` as Recoil, all state is globally accessible. And Recoil has more powerful utils such as `atomFamily` and `Snapshots` which Jotai doesn't provide.

```tsx
// * -------------------------------- Recoil

import { atom, RecoilRoot, selector, useRecoilState, useRecoilValue } from "recoil";

const App = () => {
  return (
    <RecoilRoot>
      <Comp />
    </RecoilRoot>
  );
};

const aAtom = atom({ key: "a", default: 1 });
const bAtom = atom({ key: "b", default: 2 });

const sumAtom = selector({ key: "sum", get: ({ get }) => get(aAtom) + get(bAtom) });

const Comp = () => {
  const [a, setA] = useRecoilState(aAtom);
  const [b, setB] = useRecoilState(bAtom);
  const sum = useRecoilValue(sumAtom);

  return <div>{/*  */}</div>;
};

// * -------------------------------- Jotai alternative

import { atom, useAtom } from "jotai";

const App = () => {
  return <Comp />;
};

const aAtom = atom(1);
const bAtom = atom(2);

// * types are auto detected from parameter
const sumAtom = atom((get) => get(aAtom) + get(bAtom));

const Comp = () => {
  const [a, setA] = useAtom(aAtom);
  const [b, setB] = useAtom(bAtom);
  const [sum] = useAtom(sumAtom);

  return <div>{/*  */}</div>;
};
```
