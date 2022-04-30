<script lang="ts">
  import { filtedTodos } from "../model/model.svelte";
  import TodoListItem from "./TodoListItem.svelte";
</script>

<ul class="todo-list">
  {#each $filtedTodos as item}
    <TodoListItem {item} />
  {/each}
</ul>
