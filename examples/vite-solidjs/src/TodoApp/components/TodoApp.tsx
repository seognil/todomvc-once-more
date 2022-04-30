import type { Component } from "solid-js";
import "../styles/style-from-todo-mvc-website.scss";
import "../styles/style-patch.scss";
import { NewTodoBlock } from "./NewTodoBlock";
import { StatusBar } from "./StatusBar";
import { TodoList } from "./TodoList";

// * ================================================================================

export const TodoApp: Component = () => {
  return (
    <div className="todoapp">
      <h1>todos</h1>
      <NewTodoBlock />
      <TodoList />
      <StatusBar />
    </div>
  );
};
