import type { FC, KeyboardEvent } from "react";
import { useState } from "react";
import { createTodo, toggleAllTodos, useIsAllCompleted } from "../model/model";

// * ================================================================================

// * ---------------------------------------------------------------- NewTodoBlock

export const NewTodoBlock: FC = () => {
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
};

// * ---------------------------------------------------------------- ToggleAll

const ToggleAll: FC = () => {
  const checked = useIsAllCompleted();

  return (
    <>
      <input id="toggle-all" className="toggle-all" type="checkbox" checked={checked} onChange={toggleAllTodos} />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
};
