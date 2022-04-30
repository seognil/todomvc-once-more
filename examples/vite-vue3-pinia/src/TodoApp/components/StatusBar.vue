<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";
import type { FilterMode } from "../model";
import { useFilter, useTodos } from "../model";

const filterStore = useFilter();
const { filter } = storeToRefs(filterStore);
const { changeVisibility } = filterStore;

const todoStore = useTodos();
const { remainCount, hasCompleted } = storeToRefs(todoStore);
const { clearCompleted } = todoStore;

const remainText = computed(() => `${remainCount.value} ${remainCount.value === 1 ? "item" : "items"} left`);

const filterBtnList: { target: FilterMode; text: string }[] = [
  { target: "ALL", text: "All" },
  { target: "ACTIVE", text: "Active" },
  { target: "COMPLETED", text: "Completed" },
];
</script>

<template>
  <footer class="footer">
    <span class="todo-count">{{ remainText }}</span>

    <ul class="filters">
      <li v-for="{ target, text } in filterBtnList">
        <a :class="{ selected: filter === target }" @click="() => changeVisibility(target)">
          {{ text }}
        </a>
      </li>
    </ul>

    <button v-if="hasCompleted" class="clear-completed" @click="clearCompleted">Clear completed</button>
  </footer>
</template>
