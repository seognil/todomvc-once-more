import type { FunctionalComponent as FC } from "preact";
import { useState } from "preact/compat";
import { createTodo, isAllCompleted, toggleAllTodos } from "../model";

// * ================================================================================

// * ---------------------------------------------------------------- NewTodoBlock

export const NewTodoBlock: FC = () => {
  const [newTodoInputText, setNewTodoInputText] = useState("");

  // * ---------------- actions

  const createNewTodo = (e: KeyboardEvent) => {
    if (e.key !== "Enter") return;

    createTodo(newTodoInputText);
    setNewTodoInputText("");
  };

  // * ---------------- render

  return (
    <div>
      <ToggleAll />

      <input
        className="new-todo"
        placeholder="What needs to be done"
        value={newTodoInputText}
        onChange={(e) => setNewTodoInputText((e.target as HTMLInputElement).value)}
        onKeyDown={createNewTodo}
      />
    </div>
  );
};

// * ---------------------------------------------------------------- ToggleAll

const ToggleAll: FC = () => {
  return (
    <>
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={isAllCompleted.value}
        onChange={toggleAllTodos}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
};
