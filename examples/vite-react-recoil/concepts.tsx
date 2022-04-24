import { atom, RecoilRoot, selector, useRecoilState, useRecoilValue } from "recoil";

// * ---------------- RecoilRoot wrapping

const App = () => {
  return (
    <RecoilRoot>
      <Comp />
    </RecoilRoot>
  );
};

// * ---------------- multiple atoms

const aAtom = atom({ key: "a", default: 1 });
const bAtom = atom({ key: "b", default: 2 });
const sumAtom = selector({ key: "sum", get: ({ get }) => get(aAtom) + get(bAtom) });

// * ---------------- atoms used in components

const Comp = () => {
  const [a, setA] = useRecoilState(aAtom);
  const [b, setB] = useRecoilState(bAtom);
  const sum = useRecoilValue(sumAtom);

  return (
    <div>
      <button onClick={() => setA((e) => e - 1)}> - </button>
      <span>{a}</span>
      <button onClick={() => setA((e) => e + 1)}> + </button>

      <button onClick={() => setB((e) => e - 1)}> - </button>
      <span>{b}</span>
      <button onClick={() => setB((e) => e + 1)}> + </button>

      <span>
        {a} + {b} = {sum}
      </span>
    </div>
  );
};
