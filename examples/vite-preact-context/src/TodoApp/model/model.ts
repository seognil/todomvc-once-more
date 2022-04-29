import { nanoid } from "nanoid";
import type { StateUpdater } from "preact/compat";
import { createContext, useContext, useState } from "preact/compat";

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

type UseState<T> = [T, StateUpdater<T>];

export const TodoContext = createContext<UseState<TodoData> | null>(null);

export const useCreateTodoContextValue = () => useState(DEFAULT_TODO_DATA);

export const useTodoModel = () => {
  const c = useContext(TodoContext);
  if (c === null) {
    throw new Error("Please use this in Context Provider");
  }
  const [data, setData] = c;
  const { filter, todos } = data;

  // * wrap things into function to avoid calculate every time
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
      setData((data) => ({
        ...data,
        todos: [...data.todos, { id: nanoid(), content: todoText, completed: false }],
      }));
    },

    updateTodoContent: (patch: Pick<TodoItem, "id" | "content">) => {
      setData((data) => ({
        ...data,
        todos: data.todos.map((e) => (e.id === patch.id ? { ...e, content: patch.content } : e)),
      }));
    },

    changeTodoCompletedById: (id: string) => {
      setData((data) => ({
        ...data,
        todos: data.todos.map((e) => (e.id === id ? { ...e, completed: !e.completed } : e)),
      }));
    },

    deleteTodoById: (id: string) => {
      setData((data) => ({
        ...data,
        todos: data.todos.filter((e) => e.id !== id),
      }));
    },

    // * ---------------- misc

    getRemainCount: () => todos.filter((e) => !e.completed).length,
    getHasCompleted: () => todos.filter((e) => e.completed).length > 0,

    getFilterValue: () => filter,
    changeVisibility: (filter: FilterMode) => {
      setData((data) => ({
        ...data,
        filter,
      }));
    },

    // * ---------------- toggle

    getIsAllCompleted: () => todos.length !== 0 && todos.every((e) => e.completed),

    toggleAllTodos: () => {
      setData((data) => {
        const nextCompleted = data.todos.every((e) => e.completed) ? false : true;
        return {
          ...data,
          todos: data.todos.map((e) => ({ ...e, completed: nextCompleted })),
        };
      });
    },

    clearCompleted: () => {
      setData((data) => ({
        ...data,
        todos: data.todos.filter((e) => !e.completed),
      }));
    },
  };

  return model;
};
