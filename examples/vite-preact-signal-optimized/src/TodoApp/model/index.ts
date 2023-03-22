import { batch, computed, Signal, signal } from "@preact/signals";
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

// * nested signals
// * so todos.value will effect only if add/delete items
// * (won't effect if updating item.value)
export const todos = signal<Signal<TodoItem>[]>([]);

export const completedTodos = computed(() => todos.value.filter((e) => e.value.completed));

export const activeTodos = computed(() => todos.value.filter((e) => !e.value.completed));

export const hasCompleted = computed(() => completedTodos.value.length > 0);

export const remainCount = computed(() => activeTodos.value.length);

export const filtedTodos = computed(() =>
  filter.value === "COMPLETED" ? completedTodos.value : filter.value === "ACTIVE" ? activeTodos.value : todos.value,
);

export const isAllCompleted = computed(() => todos.value.length !== 0 && todos.value.every((e) => e.value.completed));

// * ---------------------------------------------------------------- actions

// * use `.peek()` to read values, use `.value =` to update values
// * https://preactjs.com/guide/v10/signals/#reading-signals-without-subscribing-to-them

export const createTodo = (todoText: string) => {
  if (!todoText) return;
  todos.value = [...todos.peek(), signal({ id: nanoid(), content: todoText, completed: false })];
};

export const updateTodoContent = (item: Signal<TodoItem>, content: string) => {
  item.value = { ...item.peek(), content };
};

export const changeTodoCompleted = (item: Signal<TodoItem>, nextCompleted = !item.peek().completed) => {
  item.value = { ...item.peek(), completed: nextCompleted };
};

export const deleteTodoById = (id: string) => {
  todos.value = todos.peek().filter((item) => item.peek().id !== id);
};

export const changeVisibilityFilter = (filterValue: FilterMode) => {
  filter.value = filterValue;
};

export const toggleAllTodos = () => {
  batch(() => {
    const nextCompleted = !isAllCompleted.peek();
    todos.peek().forEach((item) => {
      changeTodoCompleted(item, nextCompleted);
    });
  });
};

export const clearCompleted = () => {
  todos.value = todos.peek().filter((e) => !e.peek().completed);
};
