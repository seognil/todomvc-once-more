import { observable, computed, action, autorun } from "mobx";
import { observer } from "mobx-react-lite";

// * ---------------- Mobx observables and computed

const a = observable.box(1);
const b = observable.box(2);

const sum = computed(() => a.get() + b.get());

// * ---------------- Mobx actions

const setA = action((delta) => a.set(a.get() + delta));
const setB = action((delta) => b.set(b.get() + delta));

// * ---------------- Mobx subscription without React

const unsubscribe = autorun(() => {
  console.log("side effect", sum.get());
});

unsubscribe();

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
