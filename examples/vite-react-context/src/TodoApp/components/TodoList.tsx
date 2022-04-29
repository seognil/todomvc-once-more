import clsx from "clsx";
import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import type { TodoItem } from "../model/model";
import { useTodoModel } from "../model/model";

// * ================================================================================

// * ---------------------------------------------------------------- TodoList

export const TodoList: FC = () => {
  const model = useTodoModel();
  const todos = model.getDisplayTodos();

  return (
    <ul className="todo-list">
      {todos.map((item) => (
        <TodoListItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

// * ---------------------------------------------------------------- TodoListItem

const TodoListItem: FC<{ item: TodoItem }> = ({ item }) => {
  const model = useTodoModel();

  const { id, content, completed } = item;

  const [localText, setLocalText] = useState("");
  const [editing, setEditing] = useState(false);

  // * ---------------- input auto focus effect

  const todoEditInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => todoEditInputRef.current?.focus(), [editing]);

  // * ---------------- action

  const updateTodoContent = model.updateTodoContent;
  const changeTodoCompletedById = model.changeTodoCompletedById;
  const deleteTodoById = model.deleteTodoById;

  const intoTextEditing = () => {
    setEditing(true);
    setLocalText(content);
  };

  const exitTextEdition = () => {
    setEditing(false);
    if (localText !== content) updateTodoContent({ id, content: localText });
  };

  // * ---------------- render

  return (
    <li className={clsx({ completed: completed, editing })}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={() => changeTodoCompletedById(id)}
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
};
