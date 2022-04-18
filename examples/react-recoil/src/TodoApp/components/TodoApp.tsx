import type { FC } from "react";
import "../styles/style-from-todo-mvc-website.css";
import "../styles/style-patch.css";
import { NewTodoBlock } from "./NewTodoBlock";
import { StatusBar } from "./StatusBar";
import { TodoList } from "./TodoList";

// * ================================================================================

export const TodoApp: FC = () => {
  return (
    <div className="todoapp">
      <h1>todos</h1>
      <NewTodoBlock />
      <TodoList />
      <StatusBar />
    </div>
  );
};
