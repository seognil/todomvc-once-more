import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";

// * ---------------------------------------------------------------- types and difinitions

export type FilterMode = "ALL" | "ACTIVE" | "COMPLETED";

export interface TodoItem {
  id: string;
  content: string;
  completed: boolean;
}

export interface TodoData {
  filter: FilterMode;
  todos: TodoItem[];
}

const DEFAULT_TODO_DATA: TodoData = {
  filter: "ALL",
  todos: [],
};

// * ---------------------------------------------------------------- Redux simple initialization

// * if you dont use devtools, you can bypass `type` of redux reducers and inject reducer dynamically
// * then you can use redux as simple as using plain useState! No joking!

interface TodoAction {
  type: string;

  // * reducer inversion of control
  iocReducer: (prev: TodoData) => TodoData;
}

export const todoDataStore = createStore<TodoData, TodoAction, unknown, unknown>(
  (state = DEFAULT_TODO_DATA, action) => action.iocReducer?.(state) ?? state,
);

const useTodoDispatch = () => {
  const dispatch = useDispatch();
  return (iocReducer: (data: TodoData) => TodoData) => dispatch({ type: "directUpdate", iocReducer });
};

// * ---------------------------------------------------------------- UI interactions

// * ---------------- todo crud

export const useDisplayTodos = () =>
  useSelector(({ filter, todos }: TodoData) =>
    filter === "COMPLETED"
      ? todos.filter((e) => e.completed)
      : filter === "ACTIVE"
      ? todos.filter((e) => !e.completed)
      : todos,
  );

export const useCreateTodo = () => {
  const setData = useTodoDispatch();
  return (todoText: string) => {
    if (!todoText) return;
    setData((data) => ({
      ...data,
      todos: [...data.todos, { id: nanoid(), content: todoText, completed: false }],
    }));
  };
};

export const useUpdateTodoContent = () => {
  const setData = useTodoDispatch();
  return (patch: Pick<TodoItem, "id" | "content">) => {
    setData((data) => ({
      ...data,
      todos: data.todos.map((e) => (e.id === patch.id ? { ...e, content: patch.content } : e)),
    }));
  };
};

export const useChangeTodoCompletedById = () => {
  const setData = useTodoDispatch();
  return (id: string) => {
    setData((data) => ({
      ...data,
      todos: data.todos.map((e) => (e.id === id ? { ...e, completed: !e.completed } : e)),
    }));
  };
};

export const useDeleteTodoById = () => {
  const setData = useTodoDispatch();
  return (id: string) => {
    setData((data) => ({
      ...data,
      todos: data.todos.filter((e) => e.id !== id),
    }));
  };
};

// * ---------------- misc

export const useRemainCount = () => useSelector(({ todos }: TodoData) => todos.filter((e) => !e.completed).length);
export const useHasCompleted = () => useSelector(({ todos }: TodoData) => todos.filter((e) => e.completed).length > 0);

export const useFilterValue = () => useSelector(({ filter }: TodoData) => filter);
export const useChangeVisibility = () => {
  const setData = useTodoDispatch();
  return (filter: FilterMode) => {
    setData((data) => ({
      ...data,
      filter,
    }));
  };
};

// * ---------------- toggle

export const useIsAllCompleted = () =>
  useSelector(({ todos }: TodoData) => todos.length !== 0 && todos.every((e) => e.completed));

export const useToggleAllTodos = () => {
  const setData = useTodoDispatch();
  return () => {
    setData((data) => {
      const nextCompleted = data.todos.every((e) => e.completed) ? false : true;
      return {
        ...data,
        todos: data.todos.map((e) => ({ ...e, completed: nextCompleted })),
      };
    });
  };
};

export const useClearCompleted = () => {
  const setData = useTodoDispatch();
  return () => {
    setData((data) => ({
      ...data,
      todos: data.todos.filter((e) => !e.completed),
    }));
  };
};
