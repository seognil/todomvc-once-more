<script lang="ts" context="module">
  import type { Readable } from "svelte/store";
  import { writable, derived, get } from "svelte/store";
  import { nanoid } from "nanoid";
  import { TodoItem, FILTER_MODE } from "./types";

  // * ---------------------------------------------------------------- svelte writable values

  export const todos = writable<TodoItem[]>([]);

  export const filter = writable<FILTER_MODE>(FILTER_MODE.ALL);

  export const completedTodos = derived(todos, ($todos) => $todos.filter((e) => e.completed));

  export const activeTodos = derived(todos, ($todos) => $todos.filter((e) => !e.completed));

  export const hasCompleted = derived(completedTodos, ($completedTodos) => $completedTodos.length > 0);

  export const remainCount = derived(activeTodos, ($activeTodos) => $activeTodos.length);

  export const filtedTodos = derived([todos, filter], () =>
    get(filter) === FILTER_MODE.COMPLETED
      ? get(completedTodos)
      : get(filter) === FILTER_MODE.ACTIVE
      ? get(activeTodos)
      : get(todos),
  ) as Readable<TodoItem[]>;

  export const isAllCompleted = derived(todos, ($todos) => $todos.length !== 0 && $todos.every((e) => e.completed));

  // * ---------------------------------------------------------------- actions

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

  export const changeVisibility = (mode: FILTER_MODE) => {
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
