import { nanoid } from "nanoid";
import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";

// * ---------------------------------------------------------------- types

export type FilterMode = "ALL" | "ACTIVE" | "COMPLETED";

export interface TodoItem {
  id: string;
  content: string;
  completed: boolean;
}

// * ---------------------------------------------------------------- Recoil atoms

const filter = atom<FilterMode>({ key: "visibilityFilter", default: "ALL" });

const todos = atom<TodoItem[]>({ key: "todos", default: [] });

const completedTodos = selector({ key: "completedTodos", get: ({ get }) => get(todos).filter((e) => e.completed) });

const activeTodos = selector({ key: "activeTodos", get: ({ get }) => get(todos).filter((e) => !e.completed) });

const hasCompleted = selector({ key: "hasCompleted", get: ({ get }) => get(completedTodos).length > 0 });

const remainCount = selector({ key: "remainCount", get: ({ get }) => get(activeTodos).length });

const filtedTodos = selector({
  key: "filteredTodos",
  get: ({ get }) =>
    get(filter) === "COMPLETED" ? get(completedTodos) : get(filter) === "ACTIVE" ? get(activeTodos) : get(todos),
});

const isAllCompleted = selector({
  key: "isAllCompleted",
  get: ({ get }) => get(todos).length !== 0 && get(todos).every((e) => e.completed),
});

// * ---------------------------------------------------------------- UI interactions

// * ---------------- todo crud

export const useFiltedTodos = () => useRecoilValue(filtedTodos);

export const useCreateTodo = () => {
  const setTodo = useSetRecoilState(todos);
  return (todoText: string) => {
    if (!todoText) return;
    setTodo((todos) => [...todos, { id: nanoid(), content: todoText, completed: false }]);
  };
};

export const useUpdateTodoContent = () => {
  const setTodo = useSetRecoilState(todos);
  return (patch: Pick<TodoItem, "id" | "content">) => {
    setTodo((todos) => todos.map((e) => (e.id === patch.id ? { ...e, ...patch } : e)));
  };
};

export const useChangeTodoCompletedById = () => {
  const setTodo = useSetRecoilState(todos);
  return (id: string) => {
    setTodo((todos) => todos.map((e) => (e.id === id ? { ...e, completed: !e.completed } : e)));
  };
};

export const useDeleteTodoById = () => {
  const setTodo = useSetRecoilState(todos);
  return (id: string) => {
    setTodo((todos) => todos.filter((e) => e.id !== id));
  };
};

// * ---------------- misc

export const useRemainCount = () => useRecoilValue(remainCount);
export const useHasCompleted = () => useRecoilValue(hasCompleted);

export const useFilterValue = () => useRecoilValue(filter);
export const useChangeVisibility = () => {
  const setVisibility = useSetRecoilState(filter);
  return (mode: FilterMode) => {
    setVisibility(mode);
  };
};

// * ---------------- toggle

export const useIsAllCompleted = () => useRecoilValue(isAllCompleted);

export const useToggleAllTodos = () => {
  const setTodos = useSetRecoilState(todos);
  const nextCompleted = useRecoilValue(todos).every((e) => e.completed) ? false : true;
  return () => {
    setTodos((todos) => todos.map((e) => ({ ...e, completed: nextCompleted })));
  };
};

export const useClearCompleted = () => {
  const setTodos = useSetRecoilState(todos);
  return () => {
    setTodos((todos) => todos.filter((e) => !e.completed));
  };
};
