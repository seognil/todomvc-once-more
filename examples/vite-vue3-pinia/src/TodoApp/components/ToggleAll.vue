<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTodos } from "../model/model";

const todoStore = useTodos();

const { isAllCompleted } = storeToRefs(todoStore);
const { toggleAllTodos } = todoStore;
</script>

<template>
  <input id="toggle-all" class="toggle-all" type="checkbox" :checked="isAllCompleted" @change="toggleAllTodos" />
  <label for="toggle-all">Mark all as complete</label>
</template>
