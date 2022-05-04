import type { FC } from "react";
import { Provider } from "react-redux";
import { todoDataStore } from "../model";
import "../styles/style-from-todo-mvc-website.scss";
import "../styles/style-patch.scss";
import { NewTodoBlock } from "./NewTodoBlock";
import { StatusBar } from "./StatusBar";
import { TodoList } from "./TodoList";

// * ================================================================================

export const TodoApp: FC = () => {
  return (
    <Provider store={todoDataStore}>
      <div className="todoapp">
        <h1>todos</h1>
        <NewTodoBlock />
        <TodoList />
        <StatusBar />
      </div>
    </Provider>
  );
};
