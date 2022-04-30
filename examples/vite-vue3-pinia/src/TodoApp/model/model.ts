import { nanoid } from "nanoid";
import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";

// * ---------------------------------------------------------------- types

export type FilterMode = "ALL" | "ACTIVE" | "COMPLETED";

export interface TodoItem {
  id: string;
  content: string;
  completed: boolean;
}

// * ---------------------------------------------------------------- vue reactive values

export const useFilter = defineStore("filter", () => {
  const filter = ref<FilterMode>("ALL");

  const changeVisibility = (mode: FilterMode) => {
    filter.value = mode;
  };

  return { filter, changeVisibility };
});

export const useTodos = defineStore("todos", () => {
  const { filter } = storeToRefs(useFilter());

  // * -------------------------------- values

  const todos = ref<TodoItem[]>([]);

  const completedTodos = computed(() => todos.value.filter((e) => e.completed));

  const activeTodos = computed(() => todos.value.filter((e) => !e.completed));

  const hasCompleted = computed(() => completedTodos.value.length > 0);

  const remainCount = computed(() => activeTodos.value.length);

  const filtedTodos = computed(() =>
    filter.value === "COMPLETED" ? completedTodos.value : filter.value === "ACTIVE" ? activeTodos.value : todos.value,
  );

  const isAllCompleted = computed(() => todos.value.length !== 0 && todos.value.every((e) => e.completed));

  // * -------------------------------- actions

  // * ---------------- todos

  const createTodo = (todoText: string) => {
    if (!todoText) return;
    todos.value.push({ id: nanoid(), content: todoText, completed: false });
  };

  // * just bind v-model directly
  // const updateTodoContent = (patch: Pick<TodoItem, "id" | "content">) => {
  //   const target = todos.value.find((e) => e.id === patch.id);
  //   if (!target) return;
  //   target.content = patch.content;
  // };

  // * just bind v-model directly
  // const changeTodoCompletedById = (id: string) => {
  //   const target = todos.value.find((e) => e.id === id);
  //   if (!target) return;
  //   target.completed = !target.completed;
  // };

  const deleteTodoById = (id: string) => {
    todos.value = todos.value.filter((e) => e.id !== id);
  };

  // * ---------------- toggle

  const toggleAllTodos = () => {
    const nextCompleted = todos.value.every((e) => e.completed) ? false : true;
    todos.value = todos.value.map((e) => ({ ...e, completed: nextCompleted }));
  };

  const clearCompleted = () => {
    todos.value = todos.value.filter((e) => !e.completed);
  };

  return {
    todos,
    completedTodos,
    activeTodos,
    hasCompleted,
    remainCount,
    filtedTodos,
    isAllCompleted,

    createTodo,
    deleteTodoById,
    toggleAllTodos,
    clearCompleted,
  };
});
