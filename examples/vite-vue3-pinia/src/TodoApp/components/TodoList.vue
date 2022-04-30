<script setup lang="ts">
import TodoListItem from "./TodoListItem.vue";
import { useTodos } from "../model/model";
import { storeToRefs } from "pinia";

const { filtedTodos } = storeToRefs(useTodos());
</script>

<template>
  <ul class="todo-list">
    <TodoListItem v-for="item in filtedTodos" :key="item.id" :item="item" />
  </ul>
</template>
