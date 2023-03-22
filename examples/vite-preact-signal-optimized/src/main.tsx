import { render } from "preact";
import { TodoApp } from "./TodoApp/index";

render(<TodoApp />, document.getElementById("app") as HTMLElement);
