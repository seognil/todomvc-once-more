<script lang="ts">
  import { changeVisibility, clearCompleted, filter, hasCompleted, remainCount } from "../model/model.svelte";
  import { FILTER_MODE } from "../model/types";

  $: remainText = `${$remainCount} ${$remainCount === 1 ? "item" : "items"} left`;

  const filterBtnList = [
    { target: FILTER_MODE.ALL, text: "All" },
    { target: FILTER_MODE.ACTIVE, text: "Active" },
    { target: FILTER_MODE.COMPLETED, text: "Completed" },
  ];
</script>

<footer class="footer">
  <span class="todo-count">{remainText}</span>

  <ul class="filters">
    {#each filterBtnList as { target, text }}
      <li>
        <!-- svelte-ignore a11y-missing-attribute -->
        <a class:selected={$filter === target} on:click={() => changeVisibility(target)}>
          {text}
        </a>
      </li>
    {/each}
  </ul>

  {#if $hasCompleted}
    <button class="clear-completed" on:click={clearCompleted}>Clear completed</button>
  {/if}
</footer>
