<script lang="ts">
  import type { TodoItem } from "../model/types";
  import { changeTodoCompletedById, deleteTodoById, updateTodoContent } from "../model/model.svelte";

  // * ---------------- props

  export let item: TodoItem;
  $: ({ id, content, completed } = item);

  // * ---------------- states

  let localText: string;
  let editing: boolean;

  // * ---------------- auto focus

  let todoEditInputRef: HTMLInputElement;

  $: if (editing) {
    // * setTimeout ia a tricky fix
    setTimeout(() => {
      todoEditInputRef.focus();
    }, 0);
  }

  // * ---------------- actions

  const intoTextEditing = () => {
    editing = true;
    localText = content;
  };

  const exitTextEdition = () => {
    editing = false;
    if (localText !== content) updateTodoContent({ id, content: localText });
  };
</script>

<li class:completed class:editing>
  <div class="view">
    <input
      class="toggle"
      type="checkbox"
      checked={completed}
      on:change={() => changeTodoCompletedById(id)}
      aria-label="toggle todo"
    />
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label on:dblclick={intoTextEditing}>{content}</label>
    <button class="destroy" on:click={() => deleteTodoById(id)} aria-label="delete todo" />
  </div>

  <input
    bind:this={todoEditInputRef}
    class="edit"
    bind:value={localText}
    on:keydown={(e) => e.key === "Enter" && exitTextEdition()}
    on:blur={exitTextEdition}
    aria-label="edit todo"
  />
</li>
