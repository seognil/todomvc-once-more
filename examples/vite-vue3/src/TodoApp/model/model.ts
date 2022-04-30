import { nanoid } from "nanoid";
import { computed, ref } from "vue";

// * ---------------------------------------------------------------- types

export type FilterMode = "ALL" | "ACTIVE" | "COMPLETED";

export interface TodoItem {
  id: string;
  content: string;
  completed: boolean;
}

// * ---------------------------------------------------------------- vue reactivity

export const filter = ref<FilterMode>("ALL");

export const todos = ref<TodoItem[]>([]);

export const completedTodos = computed(() => todos.value.filter((e) => e.completed));

export const activeTodos = computed(() => todos.value.filter((e) => !e.completed));

export const hasCompleted = computed(() => completedTodos.value.length > 0);

export const remainCount = computed(() => activeTodos.value.length);

export const filtedTodos = computed(() =>
  filter.value === "COMPLETED" ? completedTodos.value : filter.value === "ACTIVE" ? activeTodos.value : todos.value,
);

export const isAllCompleted = computed(() => todos.value.length !== 0 && todos.value.every((e) => e.completed));

// * ---------------------------------------------------------------- actions

// * ---------------- todos

export const createTodo = (todoText: string) => {
  if (!todoText) return;
  todos.value.push({ id: nanoid(), content: todoText, completed: false });
};

// * just bind v-model directly
// export const updateTodoContent = (patch: Pick<TodoItem, "id" | "content">) => {
//   const target = todos.value.find((e) => e.id === patch.id);
//   if (!target) return;
//   target.content = patch.content;
// };

// * just bind v-model directly
// export const changeTodoCompletedById = (id: string) => {
//   const target = todos.value.find((e) => e.id === id);
//   if (!target) return;
//   target.completed = !target.completed;
// };

export const deleteTodoById = (id: string) => {
  todos.value = todos.value.filter((e) => e.id !== id);
};

// * ---------------- misc

export const changeVisibility = (mode: FilterMode) => {
  filter.value = mode;
};

// * ---------------- toggle

export const toggleAllTodos = () => {
  const nextCompleted = todos.value.every((e) => e.completed) ? false : true;
  todos.value = todos.value.map((e) => ({ ...e, completed: nextCompleted }));
};

export const clearCompleted = () => {
  todos.value = todos.value.filter((e) => !e.completed);
};
