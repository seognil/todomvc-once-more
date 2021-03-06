## Basic Usage

- `createStore()`
- `<Provider>`
- `useSelector()`
- `useDispatch()`

In the early days of React UI development, there were not many choices for state management, Redux was the de facto standard library and everyone know it.

But when people realize it's annoying to write a lot of boilerplate for data layers or manage the gigantic single store in complex projects with redux. They often choose to use redux with other tools (like `redux-actions`) as well or wrap the redux core API with custom handmade utils.

(Now I personally never use redux again in my own projects after knowing other tools such as Mobx.)

````tsx
import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";

// * Redux (legacy version) standard usage demo (It's verbose, I just don't like it)

// * ---------------- Redux store definitions

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_A":
      return { ...state, a: state.a + action.payload };
    case "UPDATE_B":
      return { ...state, b: state.b + action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer, { a: 0, b: 0 });

// * ---------------- Redux Provider wrapping

const App = () => {
  return (
    <Provider store={store}>
      <Comp />
    </Provider>
  );
};

// * ---------------- use redux store inside Provider

const Comp = () => {
  const a = useSelector((s) => s.a);
  const b = useSelector((s) => s.b);
  const sum = a + b;

  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch({ type: "UPDATE_A", payload: -1 })}> - </button>
      <span>{a}</span>
      <button onClick={() => dispatch({ type: "UPDATE_A", payload: +1 })}> + </button>

      <button onClick={() => dispatch({ type: "UPDATE_B", payload: -1 })}> - </button>
      <span>{b}</span>
      <button onClick={() => dispatch({ type: "UPDATE_B", payload: +1 })}> + </button>

      <span>
        {a} + {b} = {sum}
      </span>
    </div>
  );
};

// * ---------------- (Subscriptions outside of render as well)

const unsubscribe = store.subscribe(() => {
  console.log("store changed: ", store.getState());
});

unsubscribe();
```tsx
````
