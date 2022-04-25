import { BehaviorSubject, combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { useObservableEagerState } from "observable-hooks";

// * ---------------- RxJS Observables

const a$ = new BehaviorSubject(1);
const b$ = new BehaviorSubject(2);

const sum$ = combineLatest([a$, b$]).pipe(map(([a, b]) => a + b));

// * ---------------- BehaviorSubject.next()

const setA = (delta) => a$.next(a$.value + delta);
const setB = (delta) => b$.next(b$.value + delta);

// * ---------------- observable-hooks is a combination of RxJS Observables and React Hooks

const Comp = () => {
  const a = useObservableEagerState(a$);
  const b = useObservableEagerState(b$);
  const sum = useObservableEagerState(sum$);

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
};

// * ---------------- (Subscriptions outside of render as well)

const subscription = sum$.subscribe((val) => {
  console.log("sum is: ", val);
});

subscription.unsubscribe();
