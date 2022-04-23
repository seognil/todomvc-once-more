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

const allTodos = atom<TodoItem[]>({ key: "todos", default: [] });

const visibilityFilter = atom<FILTER_MODE>({ key: "visibilityFilter", default: FILTER_MODE.ALL });

const completedTodos = selector<TodoItem[]>({
  key: "completedTodos",
  get: ({ get }) => get(allTodos).filter((e) => e.completed),
});

const hasCompleted = selector<boolean>({ key: "hasCompleted", get: ({ get }) => get(completedTodos).length > 0 });

const activeTodos = selector<TodoItem[]>({
  key: "activeTodos",
  get: ({ get }) => get(allTodos).filter((e) => !e.completed),
});

const remainCount = selector<number>({ key: "remainCount", get: ({ get }) => get(activeTodos).length });

const filtedTodos = selector<TodoItem[]>({
  key: "filteredTodos",
  get: ({ get }) => {
    const filter = get(visibilityFilter);
    const todos = get(allTodos);
    return filter === FILTER_MODE.COMPLETED
      ? get(completedTodos)
      : filter === FILTER_MODE.ACTIVE
      ? get(activeTodos)
      : todos;
  },
});

// * ---------------------------------------------------------------- UI interactions

// * ---------------- todo crud

export const useDisplayTodos = () => useRecoilValue(filtedTodos);

export const useCreateTodo = () => {
  const setTodo = useSetRecoilState(allTodos);
  return (todoText: string) => {
    if (!todoText) return;
    setTodo((todos) => [...todos, { id: nanoid(), content: todoText, completed: false }]);
  };
};

export const useUpdateTodoContent = () => {
  const setTodo = useSetRecoilState(allTodos);
  return (patchTodo: Pick<TodoItem, "id" | "content">) =>
    setTodo((todos) =>
      todos.map((prevTodo) => (prevTodo.id === patchTodo.id ? { ...prevTodo, ...patchTodo } : prevTodo)),
    );
};

export const useChangeTodoCompleted = () => {
  const setTodo = useSetRecoilState(allTodos);
  return (todoId: string) =>
    setTodo((todos) =>
      todos.map((prevTodo) => (prevTodo.id === todoId ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo)),
    );
};

export const useDeleteTodoById = () => {
  const setTodo = useSetRecoilState(allTodos);
  return (id: string) => setTodo((todos) => todos.filter((e) => e.id !== id));
};

// * ---------------- misc

export const useRemainCount = () => useRecoilValue(remainCount);
export const useHasCompleted = () => useRecoilValue(hasCompleted);

export const useFilterValue = () => useRecoilValue(visibilityFilter);
export const useChangeVisibility = () => {
  const setVisibility = useSetRecoilState(visibilityFilter);
  return (mode: FILTER_MODE) => setVisibility(mode);
};

// * ---------------- toggle

export const useIsAllCompleted = () => {
  const all = useRecoilValue(allTodos);
  const remain = useRecoilValue(remainCount);
  return all.length !== 0 && remain === 0;
};

export const useToggleAllTodos = () => {
  const setTodos = useSetRecoilState(allTodos);
  const remainCount = useRemainCount();
  const nextCompleted = remainCount > 0;
  return () => setTodos((todos) => todos.map((e) => ({ ...e, completed: nextCompleted })));
};

export const useClearCompleted = () => {
  const setTodos = useSetRecoilState(allTodos);
  return () => setTodos((todos) => todos.filter((e) => !e.completed));
};
