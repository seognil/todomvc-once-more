import { createContext, useContext, useState } from "react";

// * ---------------- Context and data definitions

const MyContext = createContext(null);

// * ---------------- App Context wrapping

const App = () => {
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);
  return (
    <MyContext.Provider value={{ a, setA, b, setB }}>
      <Comp />
    </MyContext.Provider>
  );
};

// * ---------------- Use content with hooks in components

const Comp = () => {
  const { a, setA, b, setB } = useContext(MyContext);

  const sum = a + b;

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
