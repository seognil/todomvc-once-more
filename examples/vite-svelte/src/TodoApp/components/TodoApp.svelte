<script lang="ts">
  import NewTodoBlock from "./NewTodoBlock.svelte";
  import StatusBar from "./StatusBar.svelte";
  import TodoList from "./TodoList.svelte";
</script>

<div class="todoapp">
  <h1>todos</h1>
  <NewTodoBlock />
  <TodoList />
  <StatusBar />
</div>
