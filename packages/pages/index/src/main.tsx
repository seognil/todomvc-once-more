import { render } from "preact";
import "uno.css";
import { Layout } from "./components/Layout";
import "./style.scss";

render(<Layout />, document.getElementById("app")!);
