## Basic Usage

- `observable()`
- `observable.box()`
- `computed()`
- `action()`
- `autorun()`
- `observer()`

Important aspect of MobX state is its mutability. On the contrary of popular solutions like Redux or useReducer which works best with immutable data structures, the MobX is based on direct mutability to notify any subscribers about the change.

Notice: By default, MobX uses proxies to make arrays and plain objects observable. Proxies provide the best performance and most consistent behavior across environments. However, if you are targeting an environment that doesn't support proxies, proxy support has to be disabled. Most notably this is the case when targeting Internet Explorer or React Native without using the Hermes engine.

Proxy support can be disabled by using configure

```tsx
import { observable, computed, action, autorun } from "mobx";
import { observer } from "mobx-react-lite";

// * ---------------- (Legacy browser support if you want)

import { configure } from "mobx";

configure({
  useProxies: "never",
});

// * ---------------- Mobx observables and computed

// * box() is for primitive values
const a = observable.box(1);
const b = observable.box(2);

const sum = computed(() => a.get() + b.get());

// * ---------------- Mobx actions

const setA = action((delta) => a.set(a.get() + delta));
const setB = action((delta) => b.set(b.get() + delta));

// * ---------------- Every observable value in observer is reactive

const Comp = observer(() => {
  return (
    <div>
      <button onClick={() => setA(-1)}> - </button>
      <span>{a}</span>
      <button onClick={() => setA(+1)}> + </button>

      <button onClick={() => setB(-1)}> - </button>
      <span>{b}</span>
      <button onClick={() => setB(+1)}> + </button>

      <span>
        {a} + {b} = {sum}
      </span>
    </div>
  );
});

// * ---------------- (Subscriptions outside of render as well)

const unsubscribe = autorun(() => {
  console.log("side effect", sum.get());
});

unsubscribe();
```
