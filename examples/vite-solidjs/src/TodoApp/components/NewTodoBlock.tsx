import { Component, createSignal } from "solid-js";
import { model } from "../model/model";

// * ================================================================================

// * ---------------------------------------------------------------- NewTodoBlock

export const NewTodoBlock: Component = () => {
  const [getNewTodoInputText, setNewTodoInputText] = createSignal("");

  // * ---------------- actions

  const createNewTodo = (e: KeyboardEvent) => {
    if (e.key !== "Enter") return;

    model.createTodo(getNewTodoInputText());
    setNewTodoInputText("");
  };

  // * ---------------- render

  return (
    <div>
      <ToggleAll />

      <input
        className="new-todo"
        placeholder="What needs to be done"
        value={getNewTodoInputText()}
        onInput={(e) => setNewTodoInputText((e.target as HTMLInputElement).value)}
        onKeyDown={createNewTodo}
      />
    </div>
  );
};

// * ---------------------------------------------------------------- ToggleAll

const ToggleAll: Component = () => {
  return (
    <>
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={model.getIsAllCompleted()}
        onChange={model.toggleAllTodos}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
};
