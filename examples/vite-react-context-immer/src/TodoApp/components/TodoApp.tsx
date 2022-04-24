import type { FC } from "react";
import { TodoContext, useCreateTodoContextValue } from "../model/model";
import "../styles/style-from-todo-mvc-website.scss";
import "../styles/style-patch.scss";
import { NewTodoBlock } from "./NewTodoBlock";
import { StatusBar } from "./StatusBar";
import { TodoList } from "./TodoList";

// * ================================================================================

export const TodoApp: FC = () => {
  const todoContextValue = useCreateTodoContextValue();

  return (
    <TodoContext.Provider value={todoContextValue}>
      <div className="todoapp">
        <h1>todos</h1>
        <NewTodoBlock />
        <TodoList />
        <StatusBar />
      </div>
    </TodoContext.Provider>
  );
};
