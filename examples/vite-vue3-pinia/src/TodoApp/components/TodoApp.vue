<script setup lang="ts">
import NewTodoBlock from "./NewTodoBlock.vue";
import StatusBar from "./StatusBar.vue";
import TodoList from "./TodoList.vue";
import "../styles/style-from-todo-mvc-website.scss";
import "../styles/style-patch.scss";
</script>

<template>
  <div class="todoapp">
    <h1>todos</h1>
    <NewTodoBlock />
    <TodoList />
    <StatusBar />
  </div>
</template>
