import { observer } from "mobx-react-lite";
import type { KeyboardEvent } from "react";
import { useState } from "react";
import { createTodo, isAllCompleted, toggleAllTodos } from "../model";

// * ================================================================================

// * ---------------------------------------------------------------- NewTodoBlock

export const NewTodoBlock = observer(() => {
  const [newTodoInputText, setNewTodoInputText] = useState("");

  // * ---------------- actions

  const createNewTodo = (e: KeyboardEvent<HTMLInputElement>) => {
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
        onChange={(e) => setNewTodoInputText(e.target.value)}
        onKeyDown={createNewTodo}
      />
    </div>
  );
});

// * ---------------------------------------------------------------- ToggleAll

const ToggleAll = observer(() => {
  const checked = isAllCompleted.get();

  return (
    <>
      <input id="toggle-all" className="toggle-all" type="checkbox" checked={checked} onChange={toggleAllTodos} />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
});
