<script setup lang="ts">
import { ref } from "vue";
import ToggleAll from "./ToggleAll.vue";
import { useTodos } from "../model/model";

const { createTodo } = useTodos();

const newTodoInputText = ref("");

const createNewTodo = (e: KeyboardEvent) => {
  if (e.key !== "Enter") return;

  createTodo(newTodoInputText.value);
  newTodoInputText.value = "";
};
</script>

<template>
  <div>
    <ToggleAll />

    <input class="new-todo" placeholder="What needs to be done" v-model="newTodoInputText" @keydown="createNewTodo" />
  </div>
</template>
