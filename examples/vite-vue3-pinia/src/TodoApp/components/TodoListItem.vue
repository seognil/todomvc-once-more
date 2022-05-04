<script setup lang="ts">
import { ref, watchEffect } from "vue";
import type { TodoItem } from "../model";
import { useTodos } from "../model";

const { deleteTodoById } = useTodos();

// * ---------------- props

const { item } = defineProps<{ item: TodoItem }>();

const { id } = item;

// * ---------------- states

const editing = ref(false);

// * ---------------- auto focus

const todoEditInputRef = ref<HTMLInputElement | null>(null);

watchEffect(() => {
  if (editing.value) {
    // * fast fix
    setTimeout(() => {
      todoEditInputRef.value?.focus();
    }, 0);
  }
});

// * ---------------- actions

const intoTextEditing = () => {
  editing.value = true;
};

const exitTextEdition = () => {
  editing.value = false;
  if (!item.content) return deleteTodoById(id);
};
</script>

<template>
  <li :class="{ editing }">
    <div class="view">
      <input class="toggle" type="checkbox" v-model="item.completed" aria-label="toggle todo" />

      <label @dblclick="intoTextEditing">{{ item.content }}</label>
      <button class="destroy" @click="() => deleteTodoById(id)" aria-label="delete todo" />
    </div>

    <input
      ref="todoEditInputRef"
      class="edit"
      v-model="item.content"
      @keydown="(e) => e.key === 'Enter' && exitTextEdition()"
      @blur="exitTextEdition"
      aria-label="edit todo"
    />
  </li>
</template>
