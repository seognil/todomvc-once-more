import { nanoid } from "nanoid";
import { createMemo, createRoot, createSignal } from "solid-js";

// * ---------------------------------------------------------------- types

export type FilterMode = "ALL" | "ACTIVE" | "COMPLETED";

export interface TodoItem {
  id: string;
  content: string;
  completed: boolean;
}

// * ---------------------------------------------------------------- Solidjs signals

export const model = createRoot(() => {
  const [filter, setFilter] = createSignal<FilterMode>("ALL");

  const [todos, setTodos] = createSignal<TodoItem[]>([]);

  const model = {
    // * ---------------- todo crud

    getFiltedTodos: createMemo(() =>
      filter() === "COMPLETED"
        ? todos().filter((e) => e.completed)
        : filter() === "ACTIVE"
        ? todos().filter((e) => !e.completed)
        : todos(),
    ),

    createTodo: (todoText: string) => {
      if (!todoText) return;
      setTodos((todos) => [...todos, { id: nanoid(), content: todoText, completed: false }]);
    },

    updateTodoContent: (patch: Pick<TodoItem, "id" | "content">) => {
      setTodos((todos) => todos.map((e) => (e.id === patch.id ? { ...e, content: patch.content } : e)));
    },

    changeTodoCompletedById: (id: string) => {
      setTodos((todos) => todos.map((e) => (e.id === id ? { ...e, completed: !e.completed } : e)));
    },

    deleteTodoById: (id: string) => {
      setTodos((todos) => todos.filter((e) => e.id !== id));
    },

    // * ---------------- misc

    getRemainCount: () => todos().filter((e) => !e.completed).length,
    getHasCompleted: () => todos().filter((e) => e.completed).length > 0,

    filter,
    changeVisibility: (filter: FilterMode) => {
      setFilter(filter);
    },

    // * ---------------- toggle

    getIsAllCompleted: () => todos.length !== 0 && todos().every((e) => e.completed),

    toggleAllTodos: () => {
      setTodos((todos) => {
        const nextCompleted = todos.every((e) => e.completed) ? false : true;
        return todos.map((e) => ({ ...e, completed: nextCompleted }));
      });
    },

    clearCompleted: () => {
      setTodos((todos) => todos.filter((e) => !e.completed));
    },
  };

  return model;
});
