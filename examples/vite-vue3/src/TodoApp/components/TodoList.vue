<script setup lang="ts">
import TodoListItem from "./TodoListItem.vue";
import { filtedTodos } from "../model/model";
</script>

<template>
  <ul class="todo-list">
    <TodoListItem v-for="item in filtedTodos" :key="item.id" :item="item" />
  </ul>
</template>
