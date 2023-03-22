import type { Signal } from "@preact/signals";
import clsx from "clsx";
import type { FunctionalComponent as FC } from "preact";
import { useEffect, useRef, useState } from "preact/compat";
import { TodoItem, changeTodoCompleted, deleteTodoById, filtedTodos, updateTodoContent } from "../model";

// * ================================================================================

// * ---------------------------------------------------------------- TodoList

export const TodoList: FC = () => {
  return (
    <ul className="todo-list">
      {filtedTodos.value.map((item) => (
        <TodoListItem key={item.value.id} item={item} />
      ))}
    </ul>
  );
};

// * ---------------------------------------------------------------- TodoListItem

const TodoListItem: FC<{ item: Signal<TodoItem> }> = ({ item }) => {
  const { id, content, completed } = item.value;

  const [localText, setLocalText] = useState("");
  const [editing, setEditing] = useState(false);

  // * ---------------- input auto focus effect

  const todoEditInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => todoEditInputRef.current?.focus(), [editing]);

  // * ---------------- actions

  const intoTextEditing = () => {
    setEditing(true);
    setLocalText(content);
  };

  const exitTextEdition = () => {
    setEditing(false);
    if (!localText) return deleteTodoById(id);
    if (localText !== content) return updateTodoContent(item, localText);
  };

  // * ---------------- render

  return (
    <li className={clsx({ completed: completed, editing })}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={() => changeTodoCompleted(item)}
          aria-label="toggle todo"
        />
        <label onDblClick={intoTextEditing}>{content}</label>
        <button className="destroy" onClick={() => deleteTodoById(id)} aria-label="delete todo" />
      </div>

      <input
        ref={todoEditInputRef}
        className="edit"
        value={localText}
        onChange={(e) => setLocalText((e.target as HTMLInputElement).value)}
        onKeyDown={(e) => e.key === "Enter" && exitTextEdition()}
        onBlur={exitTextEdition}
        aria-label="edit todo"
      />
    </li>
  );
};
