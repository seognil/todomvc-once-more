<script lang="ts">
  import { isAllCompleted, toggleAllTodos } from "../model/model.svelte";
</script>

<input id="toggle-all" class="toggle-all" type="checkbox" checked={$isAllCompleted} on:change={toggleAllTodos} />
<label for="toggle-all">Mark all as complete</label>
