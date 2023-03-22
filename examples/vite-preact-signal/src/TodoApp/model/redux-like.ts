import { computed, signal } from "@preact/signals";
import { nanoid } from "nanoid";

// * ---------------------------------------------------------------- types and difinitions

export type FilterMode = "ALL" | "ACTIVE" | "COMPLETED";

export interface TodoItem {
  id: string;
  content: string;
  completed: boolean;
}

// * ---------------------------------------------------------------- signals

export const filter = signal<FilterMode>("ALL");

// * JSON-style signal (store everything like redux or context/useState)
export const todos = signal<TodoItem[]>([]);

export const completedTodos = computed(() => todos.value.filter((e) => e.completed));

export const activeTodos = computed(() => todos.value.filter((e) => !e.completed));

export const hasCompleted = computed(() => completedTodos.value.length > 0);

export const remainCount = computed(() => activeTodos.value.length);

export const filtedTodos = computed(() =>
  filter.value === "COMPLETED" ? completedTodos.value : filter.value === "ACTIVE" ? activeTodos.value : todos.value,
);

export const isAllCompleted = computed(() => todos.value.length !== 0 && todos.value.every((e) => e.completed));

// * ---------------------------------------------------------------- actions

export const createTodo = (todoText: string) => {
  if (!todoText) return;
  todos.value = [...todos.value, { id: nanoid(), content: todoText, completed: false }];
};

export const updateTodoContent = (patch: Pick<TodoItem, "id" | "content">) => {
  todos.value = todos.value.map((e) => (e.id === patch.id ? { ...e, ...patch } : e));
};

export const changeTodoCompletedById = (id: string) => {
  todos.value = todos.value.map((e) => (e.id === id ? { ...e, completed: !e.completed } : e));
};

export const deleteTodoById = (id: string) => {
  todos.value = todos.value.filter((e) => e.id !== id);
};

export const changeVisibilityFilter = (filterValue: FilterMode) => {
  filter.value = filterValue;
};

export const toggleAllTodos = () => {
  todos.value = todos.value.map((e) => ({ ...e, completed: !isAllCompleted.value }));
};

export const clearCompleted = () => {
  todos.value = todos.value.filter((e) => !e.completed);
};
