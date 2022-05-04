<script setup lang="ts">
import { isAllCompleted, toggleAllTodos } from "../model";
</script>

<template>
  <input id="toggle-all" class="toggle-all" type="checkbox" :checked="isAllCompleted" @change="toggleAllTodos" />
  <label for="toggle-all">Mark all as complete</label>
</template>
