import type { FunctionalComponent as FC } from "preact";
import { useState } from "preact/compat";
import { useTodoModel } from "../model";

// * ================================================================================

// * ---------------------------------------------------------------- NewTodoBlock

export const NewTodoBlock: FC = () => {
  const [newTodoInputText, setNewTodoInputText] = useState("");
  const model = useTodoModel();

  // * ---------------- actions

  const createNewTodo = (e: KeyboardEvent) => {
    if (e.key !== "Enter") return;

    model.createTodo(newTodoInputText);
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
  const model = useTodoModel();
  const checked = model.getIsAllCompleted();
  const toggleAll = model.toggleAllTodos;

  return (
    <>
      <input id="toggle-all" className="toggle-all" type="checkbox" checked={checked} onChange={toggleAll} />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
};
