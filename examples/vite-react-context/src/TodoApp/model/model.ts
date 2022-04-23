import { nanoid } from "nanoid";

import { createContext, useContext, useState } from "react";

// * ---------------------------------------------------------------- types and const

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

export interface TodoData {
  filter: FILTER_MODE;
  todos: TodoItem[];
}

const DEFAULT_TODO_DATA: TodoData = {
  filter: FILTER_MODE.ALL,
  todos: [],
};

// * ---------------------------------------------------------------- react context and model

type UseState<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export const TodoContext = createContext<UseState<TodoData> | null>(null);

export const useCreateTodoContextValue = () => useState(DEFAULT_TODO_DATA);

export const useTodoModel = () => {
  const c = useContext(TodoContext);
  if (c === null) {
    throw new Error("Please use this in Context Provider");
  }
  const [data, setData] = c;
  const { filter, todos } = data;

  const model = {
    // * ---------------- todo crud

    getDisplayTodos: () =>
      filter === FILTER_MODE.COMPLETED
        ? todos.filter((e) => e.completed)
        : filter === FILTER_MODE.ACTIVE
        ? todos.filter((e) => !e.completed)
        : todos,

    createTodo: (todoText: string) => {
      if (!todoText) return;
      setData((data) => ({
        ...data,
        todos: [...data.todos, { id: nanoid(), content: todoText, completed: false }],
      }));
    },

    updateTodoContent: (patchTodo: Pick<TodoItem, "id" | "content">) => {
      setData((data) => ({
        ...data,
        todos: data.todos.map((todo) => (todo.id === patchTodo.id ? { ...todo, content: patchTodo.content } : todo)),
      }));
    },

    changeTodoCompletedById: (id: string) => {
      setData((data) => ({
        ...data,
        todos: data.todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
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
    changeVisibility: (filter: FILTER_MODE) => setData((data) => ({ ...data, filter })),

    // * ---------------- toggle

    getIsAllCompleted: () => todos.length !== 0 && todos.every((e) => e.completed),

    toggleAllTodos: () => {
      setData((data) => {
        const nextCompleted = data.todos.every((e) => e.completed) ? false : true;
        return {
          ...data,
          todos: data.todos.map((todo) => ({ ...todo, completed: nextCompleted })),
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
