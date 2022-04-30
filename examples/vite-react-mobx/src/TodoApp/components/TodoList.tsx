import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import type { TodoItem } from "../model/model";
import { deleteTodoById, filtedTodos } from "../model/model";

// * ================================================================================

// * ---------------------------------------------------------------- TodoList

export const TodoList = observer(() => {
  return (
    <ul className="todo-list">
      {filtedTodos.get().map((item) => (
        <TodoListItem key={item.id} item={item} />
      ))}
    </ul>
  );
});

// * ---------------------------------------------------------------- TodoListItem

const TodoListItem = observer<{ item: TodoItem }>(({ item }) => {
  const { id, content, completed } = item;

  const [localText, setLocalText] = useState("");
  const [editing, setEditing] = useState(false);

  // * ---------------- input auto focus effect

  const todoEditInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => todoEditInputRef.current?.focus(), [editing]);

  // * ---------------- actions

  const updateTodoContent = () => {
    item.content = localText;
  };

  const changeTodoCompleted = () => {
    item.completed = !item.completed;
  };

  const intoTextEditing = () => {
    setEditing(true);
    setLocalText(content);
  };

  const exitTextEdition = () => {
    setEditing(false);
    if (localText !== content) updateTodoContent();
  };

  // * ---------------- render

  return (
    <li className={clsx({ completed: completed, editing })}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={changeTodoCompleted}
          aria-label="toggle todo"
        />
        <label onDoubleClick={intoTextEditing}>{content}</label>
        <button className="destroy" onClick={() => deleteTodoById(id)} aria-label="delete todo" />
      </div>

      <input
        ref={todoEditInputRef}
        className="edit"
        value={localText}
        onChange={(e) => setLocalText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && exitTextEdition()}
        onBlur={exitTextEdition}
        aria-label="edit todo"
      />
    </li>
  );
});
