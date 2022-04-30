import { Component, createEffect, createSignal } from "solid-js";
import type { TodoItem } from "../model";
import { model } from "../model";

// * ================================================================================

// * ---------------------------------------------------------------- TodoList

export const TodoList: Component = () => {
  return (
    <ul className="todo-list">
      {model.getFiltedTodos().map((item) => (
        <TodoListItem item={item} />
      ))}
    </ul>
  );
};

// * ---------------------------------------------------------------- TodoListItem

const TodoListItem: Component<{ item: TodoItem }> = ({ item }) => {
  const { id, content, completed } = item;

  const [getLocalText, setLocalText] = createSignal("");
  const [isEditing, setEditing] = createSignal(false);

  // * ---------------- input auto focus effect

  let todoEditInputRef: HTMLInputElement;

  createEffect(() => {
    isEditing() && todoEditInputRef?.focus();
  });

  // * ---------------- actions

  const intoTextEditing = () => {
    setEditing(true);
    setLocalText(content);
  };

  const exitTextEdition = () => {
    setEditing(false);
    if (!getLocalText()) return model.deleteTodoById(id);
    if (getLocalText() !== content) return model.updateTodoContent({ id, content: getLocalText() });
  };

  // * ---------------- render

  return (
    <li classList={{ completed, editing: isEditing() }}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={() => model.changeTodoCompletedById(id)}
          aria-label="toggle todo"
        />
        <label onDblClick={intoTextEditing}>{content}</label>
        <button className="destroy" onClick={() => model.deleteTodoById(id)} aria-label="delete todo" />
      </div>

      <input
        // @ts-ignore
        ref={todoEditInputRef}
        className="edit"
        value={getLocalText()}
        onChange={(e) => setLocalText((e.target as HTMLInputElement).value)}
        onKeyDown={(e) => e.key === "Enter" && exitTextEdition()}
        onBlur={exitTextEdition}
        aria-label="edit todo"
      />
    </li>
  );
};
