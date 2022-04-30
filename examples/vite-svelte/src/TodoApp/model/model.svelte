<script lang="ts" context="module">
  import { nanoid } from "nanoid";
  import { writable, derived, get } from "svelte/store";
  import type { Readable } from "svelte/store";
  import type { TodoItem, FilterMode } from "./types";

  // * ---------------------------------------------------------------- svelte writable values

  export const filter = writable<FilterMode>("ALL");

  export const todos = writable<TodoItem[]>([]);

  export const completedTodos = derived(todos, ($todos) => $todos.filter((e) => e.completed));

  export const activeTodos = derived(todos, ($todos) => $todos.filter((e) => !e.completed));

  export const hasCompleted = derived(completedTodos, ($completedTodos) => $completedTodos.length > 0);

  export const remainCount = derived(activeTodos, ($activeTodos) => $activeTodos.length);

  export const filtedTodos = derived([todos, filter], () =>
    get(filter) === "COMPLETED" ? get(completedTodos) : get(filter) === "ACTIVE" ? get(activeTodos) : get(todos),
  );

  export const isAllCompleted = derived(todos, ($todos) => $todos.length !== 0 && $todos.every((e) => e.completed));

  // * ---------------------------------------------------------------- actions

  // * ---------------- todos

  export const createTodo = (todoText: string) => {
    if (!todoText) return;
    todos.update((todos) => [...todos, { id: nanoid(), content: todoText, completed: false }]);
  };

  export const updateTodoContent = (patch: Pick<TodoItem, "id" | "content">) => {
    todos.update((todos) => todos.map((e) => (e.id === patch.id ? { ...e, ...patch } : e)));
  };

  export const changeTodoCompletedById = (id: string) => {
    todos.update((todos) => todos.map((e) => (e.id === id ? { ...e, completed: !e.completed } : e)));
  };

  export const deleteTodoById = (id: string) => {
    todos.update((todos) => todos.filter((e) => e.id !== id));
  };

  // * ---------------- misc

  export const changeVisibility = (mode: FilterMode) => {
    filter.set(mode);
  };

  // * ---------------- toggle

  export const toggleAllTodos = () => {
    const nextCompleted = get(todos).every((e) => e.completed) ? false : true;
    todos.update((todos) => todos.map((e) => ({ ...e, completed: nextCompleted })));
  };

  export const clearCompleted = () => {
    todos.update((todos) => todos.filter((e) => !e.completed));
  };
</script>
