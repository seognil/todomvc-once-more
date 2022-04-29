import { nanoid } from "nanoid";
import { useObservableEagerState } from "observable-hooks";
import { BehaviorSubject } from "rxjs";
import { map, switchMap } from "rxjs/operators";

// * ---------------------------------------------------------------- types

export type FilterMode = "ALL" | "ACTIVE" | "COMPLETED";

export interface TodoItem {
  id: string;
  content: string;
  completed: boolean;
}

// * ---------------------------------------------------------------- RxJS observables

const todos$ = new BehaviorSubject<TodoItem[]>([]);

const filter$ = new BehaviorSubject<FilterMode>("ALL");

const completedTodos$ = todos$.pipe(map((todos) => todos.filter((e) => e.completed)));

const activeTodos$ = todos$.pipe(map((todos) => todos.filter((e) => !e.completed)));

const hasCompleted$ = completedTodos$.pipe(map((list) => list.length > 0));

const remainCount$ = activeTodos$.pipe(map((list) => list.length));

const filtedTodos$ = filter$.pipe(
  switchMap((filter) => (filter === "COMPLETED" ? completedTodos$ : filter === "ACTIVE" ? activeTodos$ : todos$)),
);

const isAllCompleted$ = todos$.pipe(map((todos) => todos.length !== 0 && todos.every((e) => e.completed)));

// * ---------------------------------------------------------------- UI interactions

// * ---------------- todo crud

export const useDisplayTodos = () => useObservableEagerState(filtedTodos$);

export const createTodo = (todoText: string) => {
  if (!todoText) return;
  todos$.next([...todos$.value, { id: nanoid(), content: todoText, completed: false }]);
};

export const updateTodoContent = (patch: Pick<TodoItem, "id" | "content">) => {
  todos$.next(todos$.value.map((e) => (e.id === patch.id ? { ...e, ...patch } : e)));
};

export const changeTodoCompletedById = (id: string) => {
  todos$.next(todos$.value.map((e) => (e.id === id ? { ...e, completed: !e.completed } : e)));
};

export const deleteTodoById = (id: string) => {
  todos$.next(todos$.value.filter((e) => e.id !== id));
};

// * ---------------- misc

export const useRemainCount = () => useObservableEagerState(remainCount$);
export const useHasCompleted = () => useObservableEagerState(hasCompleted$);

export const useFilterValue = () => useObservableEagerState(filter$);

export const changeVisibility = (value: FilterMode) => {
  filter$.next(value);
};

// * ---------------- toggle

export const useIsAllCompleted = () => useObservableEagerState(isAllCompleted$);

export const toggleAllTodos = () => {
  const nextCompleted = todos$.value.every((e) => e.completed) ? false : true;
  todos$.next(todos$.value.map((e) => ({ ...e, completed: nextCompleted })));
};

export const clearCompleted = () => {
  todos$.next(todos$.value.filter((e) => !e.completed));
};
