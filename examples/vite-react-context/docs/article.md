## Basic Usage

- `useState()`
- `useContext()`
- `<MyContext.Provider value={}>`

Basic usage of React Functional Components with built-in Hooks and Context API.

It's simple, but there is a problem, once the context changes, all components will be re-rendered by default. It's trivial to do the performance optimization manually or split the model/domain layer in large projects.

That's why third-party libraries appear to solve these pain points.

```tsx
import { createContext, useContext, useState } from "react";

// * ---------------- Context and data definitions

const MyContext = createContext(null);

// * ---------------- useState and Context wrapping

const App = () => {
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);
  return (
    <MyContext.Provider value={{ a, setA, b, setB }}>
      <Comp />
    </MyContext.Provider>
  );
};

// * ---------------- Use contexted values with hooks in components

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
```
