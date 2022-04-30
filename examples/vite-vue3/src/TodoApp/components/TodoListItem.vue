<script setup lang="ts">
import { ref, watchEffect } from "vue";
import type { TodoItem } from "../model/model";
import { deleteTodoById } from "../model/model";

// * ---------------- props

const { item } = defineProps<{ item: TodoItem }>();

const { id } = item;

// * ---------------- states

const localText = ref("");
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

// * ---------------- action

// * use v-model instead
// const changeTodoCompleted = () => {
//   item.completed = !item.completed;
// };

const updateTodoContent = () => {
  item.content = localText.value;
};

const intoTextEditing = () => {
  editing.value = true;
  localText.value = item.content;
};

const exitTextEdition = () => {
  editing.value = false;
  if (localText.value !== item.content) updateTodoContent();
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
      v-model="localText"
      @keydown="(e) => e.key === 'Enter' && exitTextEdition()"
      @blur="exitTextEdition"
      aria-label="edit todo"
    />
  </li>
</template>
