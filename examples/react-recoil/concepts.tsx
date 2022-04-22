import { atom, RecoilRoot, useRecoilState } from "recoil";

const counterAtom = atom({ key: "counter", default: 0 });

const App = () => {
  return (
    <RecoilRoot>
      <Layout />
    </RecoilRoot>
  );
};

const Layout = () => {
  const [count, setCount] = useRecoilState(counterAtom);

  return (
    <div>
      <span>{count}</span>

      <button onClick={() => setCount((e) => e - 1)}> - </button>

      <button onClick={() => setCount((e) => e + 1)}> + </button>
    </div>
  );
};
