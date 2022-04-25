import { atom, useAtom } from "jotai";
import { nanoid } from "nanoid";

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

const todos = atom<TodoItem[]>([]);

const filter = atom<FILTER_MODE>(FILTER_MODE.ALL);

const completedTodos = atom((get) => get(todos).filter((e) => e.completed));

const activeTodos = atom((get) => get(todos).filter((e) => !e.completed));

const hasCompleted = atom((get) => get(completedTodos).length > 0);

const remainCount = atom((get) => get(activeTodos).length);

const filtedTodos = atom((get) =>
  get(filter) === FILTER_MODE.COMPLETED
    ? get(completedTodos)
    : get(filter) === FILTER_MODE.ACTIVE
    ? get(activeTodos)
    : get(todos),
);

const isAllCompleted = atom((get) => get(todos).length !== 0 && get(todos).every((e) => e.completed));

// * ---------------------------------------------------------------- UI interactions

// * ---------------- todo crud

export const useDisplayTodos = () => useAtom(filtedTodos)[0];

export const useCreateTodo = () => {
  const [, setTodo] = useAtom(todos);
  return (todoText: string) => {
    if (!todoText) return;
    setTodo((todos) => [...todos, { id: nanoid(), content: todoText, completed: false }]);
  };
};

export const useUpdateTodoContent = () => {
  const [, setTodo] = useAtom(todos);
  return (patch: Pick<TodoItem, "id" | "content">) => {
    setTodo((todos) => todos.map((e) => (e.id === patch.id ? { ...e, ...patch } : e)));
  };
};

export const useChangeTodoCompletedById = () => {
  const [, setTodo] = useAtom(todos);
  return (id: string) => {
    setTodo((todos) => todos.map((e) => (e.id === id ? { ...e, completed: !e.completed } : e)));
  };
};

export const useDeleteTodoById = () => {
  const [, setTodo] = useAtom(todos);
  return (id: string) => {
    setTodo((todos) => todos.filter((e) => e.id !== id));
  };
};

// * ---------------- misc

export const useRemainCount = () => useAtom(remainCount)[0];
export const useHasCompleted = () => useAtom(hasCompleted)[0];

export const useFilterValue = () => useAtom(filter)[0];
export const useChangeVisibility = () => {
  const [, setVisibility] = useAtom(filter);
  return (mode: FILTER_MODE) => {
    setVisibility(mode);
  };
};

// * ---------------- toggle

export const useIsAllCompleted = () => useAtom(isAllCompleted)[0];

export const useToggleAllTodos = () => {
  const [, setTodos] = useAtom(todos);
  const remainCount = useRemainCount();
  const nextCompleted = remainCount > 0;
  return () => {
    setTodos((todos) => todos.map((e) => ({ ...e, completed: nextCompleted })));
  };
};

export const useClearCompleted = () => {
  const [, setTodos] = useAtom(todos);
  return () => {
    setTodos((todos) => todos.filter((e) => !e.completed));
  };
};