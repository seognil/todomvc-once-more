## Basic Usage

- `produce()`
- `enableES5()`

One sentence introduction, the author of `Immer` also created `Mobx`

The basic idea is that with Immer you will apply all your changes to a temporary draft, which is a proxy of the currentState. Once all your mutations are completed, Immer will produce the nextState based on the mutations to the draft state. This means that you can interact with your data by simply modifying it while keeping all the benefits of immutable data.

By default `produce` tries to use proxies for optimal performance. However, on older JavaScript engines `Proxy` is not available. For example, when running Microsoft Internet Explorer or React Native (if < v0.59 or when using the Hermes engine on React Native < 0.64) on Android. In such cases, Immer will fallback to an ES5 compatible implementation which works identically, but is a bit slower.

```tsx
const data = {
  list: [
    10,
    20,
    {
      nest: [30, 40],
      val: 50,
    },
    60,
  ],
};

// * -------------------------------- without immer

// * when you patching a complex immutable data in js without tools

{
  // * change value 40 to 90

  setState((data) => {
    const nextList = [...data.list];
    const nextInnerObj = { ...data.list[2] };
    nextList[2] = nextInnerObj;
    nextInnerObj.nest = [...nextInnerObj.nest];
    nextInnerObj.nest[1] = 90;

    const nextData = {
      list: nextList,
    };

    return nextData;
  });
}

// * -------------------------------- immer equivalent

import { produce } from "immer";

{
  // * change value 40 to 90

  setState((data) =>
    produce(data, (draft) => {
      draft.list[2].nest[1] = 90;
    }),
  );
}
```
