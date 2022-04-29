import { Draft, produce } from "immer";
import { nanoid } from "nanoid";
import { createContext, useContext, useState } from "react";

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

// * ---------------------------------------------------------------- react context and model

type SetStateWithImmer<T> = (updater: (draft: Draft<T>) => void) => void;
type UseStateWithImmer<T> = readonly [T, SetStateWithImmer<T>];

export const TodoContext = createContext<UseStateWithImmer<TodoData> | null>(null);

export const useCreateTodoContextValue = () => {
  const [data, setData] = useState(DEFAULT_TODO_DATA);
  const setDataWithImmer: SetStateWithImmer<TodoData> = (updater) => {
    setData(produce(data, updater));
  };
  return [data, setDataWithImmer] as const;
};

export const useTodoModel = () => {
  const c = useContext(TodoContext);
  if (c === null) {
    throw new Error("Please use this in Context Provider");
  }
  const [data, setData] = c;
  const { filter, todos } = data;

  // * wrap things into function to avoid useContext boilerplate and achieve lazy evaluation
  const model = {
    // * ---------------- todo crud

    getDisplayTodos: () =>
      filter === "COMPLETED"
        ? todos.filter((e) => e.completed)
        : filter === "ACTIVE"
        ? todos.filter((e) => !e.completed)
        : todos,

    createTodo: (todoText: string) => {
      if (!todoText) return;
      setData((data) => {
        data.todos.push({ id: nanoid(), content: todoText, completed: false });
      });
    },

    updateTodoContent: (patch: Pick<TodoItem, "id" | "content">) => {
      setData((data) => {
        const target = data.todos.find((e) => e.id === patch.id);
        if (!target) return;
        target.content = patch.content;
      });
    },

    changeTodoCompletedById: (id: string) => {
      setData((data) => {
        const target = data.todos.find((e) => e.id === id);
        if (!target) return;
        target.completed = !target.completed;
      });
    },

    deleteTodoById: (id: string) => {
      setData((data) => {
        data.todos = data.todos.filter((e) => e.id !== id);
      });
    },

    // * ---------------- misc

    getRemainCount: () => todos.filter((e) => !e.completed).length,
    getHasCompleted: () => todos.filter((e) => e.completed).length > 0,

    getFilterValue: () => filter,
    changeVisibility: (filter: FilterMode) => {
      setData((data) => {
        data.filter = filter;
      });
    },

    // * ---------------- toggle

    getIsAllCompleted: () => todos.length !== 0 && todos.every((e) => e.completed),

    toggleAllTodos: () => {
      setData((data) => {
        const nextCompleted = data.todos.every((e) => e.completed) ? false : true;
        data.todos.forEach((e) => {
          e.completed = nextCompleted;
        });
      });
    },
    clearCompleted: () => {
      setData((data) => {
        data.todos = data.todos.filter((e) => !e.completed);
      });
    },
  };

  return model;
};
