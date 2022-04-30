<script lang="ts">
  import ToggleAll from "./ToggleAll.svelte";
  import { createTodo } from "../model/model.svelte";

  let newTodoInputText = "";

  const createNewTodo = (e: KeyboardEvent) => {
    if (e.key !== "Enter") return;

    createTodo(newTodoInputText);
    newTodoInputText = "";
  };
</script>

<div>
  <ToggleAll />

  <input
    class="new-todo"
    placeholder="What needs to be done"
    bind:value={newTodoInputText}
    on:keydown={createNewTodo}
  />
</div>
