import { computed, Signal } from "@preact/signals";

import { produce } from "immer";
import { nanoid } from "nanoid";

// * ---------------------------------------------------------------- signal + immer helper

type ImmerUpdater<D> = (draft: D) => D | void | undefined;

class SignalImmer<T = any> extends Signal<T> {
  update(updater: T | ImmerUpdater<T>) {
    this.value = typeof updater === "function" ? produce(this.peek(), updater as ImmerUpdater<T>) : updater;
  }
}
const signalImmer = <T>(value: T) => new SignalImmer(value);

// * ---------------------------------------------------------------- types and difinitions

export type FilterMode = "ALL" | "ACTIVE" | "COMPLETED";

export interface TodoItem {
  id: string;
  content: string;
  completed: boolean;
}

// * ---------------------------------------------------------------- signals

export const filter = signalImmer<FilterMode>("ALL");

// * JSON-style signal (store everything like redux or context/useState)
export const todos = signalImmer<TodoItem[]>([]);

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
  todos.update((todos) => {
    todos.push({ id: nanoid(), content: todoText, completed: false });
  });
};

export const updateTodoContent = (patch: Pick<TodoItem, "id" | "content">) => {
  todos.update((todos) => {
    const target = todos.find((e) => e.id === patch.id);
    if (!target) return;
    target.content = patch.content;
  });
};

export const changeTodoCompletedById = (id: string) => {
  todos.update((todos) => {
    const target = todos.find((e) => e.id === id);
    if (!target) return;
    target.completed = !target.completed;
  });
};

export const deleteTodoById = (id: string) => {
  todos.value = todos.peek().filter((e) => e.id !== id);
};

export const changeVisibilityFilter = (filterValue: FilterMode) => {
  filter.value = filterValue;
};

export const toggleAllTodos = () => {
  todos.value = todos.peek().map((e) => ({ ...e, completed: !isAllCompleted.value }));
};

export const clearCompleted = () => {
  todos.value = todos.peek().filter((e) => !e.completed);
};

