import { nanoid } from "nanoid";
import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";

// * ---------------------------------------------------------------- types

export enum FILTER_MODE {
  "ALL",
  "ACTIVE",
  "COMPLETED",
}

export interface TodoItem {
  id: string;
  content: string;
  completed: boolean;
}

// * ---------------------------------------------------------------- Recoil atoms

const todos = atom<TodoItem[]>({ key: "todos", default: [] });

const filter = atom<FILTER_MODE>({ key: "visibilityFilter", default: FILTER_MODE.ALL });

const completedTodos = selector<TodoItem[]>({
  key: "completedTodos",
  get: ({ get }) => get(todos).filter((e) => e.completed),
});

const activeTodos = selector<TodoItem[]>({
  key: "activeTodos",
  get: ({ get }) => get(todos).filter((e) => !e.completed),
});

const hasCompleted = selector<boolean>({ key: "hasCompleted", get: ({ get }) => get(completedTodos).length > 0 });

const remainCount = selector<number>({ key: "remainCount", get: ({ get }) => get(activeTodos).length });

const filtedTodos = selector<TodoItem[]>({
  key: "filteredTodos",
  get: ({ get }) =>
    get(filter) === FILTER_MODE.COMPLETED
      ? get(completedTodos)
      : get(filter) === FILTER_MODE.ACTIVE
      ? get(activeTodos)
      : get(todos),
});

// * ---------------------------------------------------------------- UI interactions

// * ---------------- todo crud

export const useDisplayTodos = () => useRecoilValue(filtedTodos);

export const useCreateTodo = () => {
  const setTodo = useSetRecoilState(todos);
  return (todoText: string) => {
    if (!todoText) return;
    setTodo((todos) => [...todos, { id: nanoid(), content: todoText, completed: false }]);
  };
};

export const useUpdateTodoContent = () => {
  const setTodo = useSetRecoilState(todos);
  return (patchTodo: Pick<TodoItem, "id" | "content">) =>
    setTodo((todos) =>
      todos.map((prevTodo) => (prevTodo.id === patchTodo.id ? { ...prevTodo, ...patchTodo } : prevTodo)),
    );
};

export const useChangeTodoCompleted = () => {
  const setTodo = useSetRecoilState(todos);
  return (todoId: string) =>
    setTodo((todos) =>
      todos.map((prevTodo) => (prevTodo.id === todoId ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo)),
    );
};

export const useDeleteTodoById = () => {
  const setTodo = useSetRecoilState(todos);
  return (id: string) => setTodo((todos) => todos.filter((e) => e.id !== id));
};

// * ---------------- misc

export const useRemainCount = () => useRecoilValue(remainCount);
export const useHasCompleted = () => useRecoilValue(hasCompleted);

export const useFilterValue = () => useRecoilValue(filter);
export const useChangeVisibility = () => {
  const setVisibility = useSetRecoilState(filter);
  return (mode: FILTER_MODE) => setVisibility(mode);
};

// * ---------------- toggle

export const useIsAllCompleted = () => {
  const all = useRecoilValue(todos);
  const remain = useRecoilValue(remainCount);
  return all.length !== 0 && remain === 0;
};

export const useToggleAllTodos = () => {
  const setTodos = useSetRecoilState(todos);
  const remainCount = useRemainCount();
  const nextCompleted = remainCount > 0;
  return () => setTodos((todos) => todos.map((e) => ({ ...e, completed: nextCompleted })));
};

export const useClearCompleted = () => {
  const setTodos = useSetRecoilState(todos);
  return () => setTodos((todos) => todos.filter((e) => !e.completed));
};
