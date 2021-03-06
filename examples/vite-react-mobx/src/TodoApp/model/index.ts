import { action, computed, observable } from "mobx";
import { nanoid } from "nanoid";

// * ---------------------------------------------------------------- types

export type FilterMode = "ALL" | "ACTIVE" | "COMPLETED";

export interface TodoItem {
  id: string;
  content: string;
  completed: boolean;
}

// * ---------------------------------------------------------------- mobx observables and computed

export const filter = observable.box<FilterMode>("ALL");

export const todos = observable<TodoItem>([]);

export const completedTodos = computed(() => todos.filter((e) => e.completed));

export const activeTodos = computed(() => todos.filter((e) => !e.completed));

export const hasCompleted = computed(() => completedTodos.get().length > 0);

export const remainCount = computed(() => activeTodos.get().length);

export const filtedTodos = computed(() =>
  filter.get() === "COMPLETED" ? completedTodos.get() : filter.get() === "ACTIVE" ? activeTodos.get() : todos,
);

export const isAllCompleted = computed(() => todos.length !== 0 && todos.every((e) => e.completed));

// * ---------------------------------------------------------------- actions

// * ---------------- todos

export const createTodo = action((todoText: string) => {
  if (!todoText) return;
  todos.push({ id: nanoid(), content: todoText, completed: false });
});

// * implement by updating TodoItem Proxy directly in component
// export const updateTodoContent = action((patch: Pick<TodoItem, "id" | "content">) => {
//   const target = todos.find((e) => e.id === patch.id);
//   if (!target) return;
//   target.content = patch.content;
// });

// * implement by updating TodoItem Proxy directly in component
// export const changeTodoCompletedById = action((id: string) => {
//   const target = todos.find((e) => e.id === id);
//   if (!target) return;
//   target.completed = !target.completed;
// });

export const deleteTodoById = action((id: string) => {
  todos.replace(todos.filter((e) => e.id !== id));
});

export const changeVisibility = action((value: FilterMode) => filter.set(value));

export const toggleAllTodos = action(() => {
  const nextCompleted = todos.every((e) => e.completed) ? false : true;
  todos.forEach((e) => {
    e.completed = nextCompleted;
  });
});

export const clearCompleted = action(() => {
  todos.replace(todos.filter((e) => !e.completed));
});
