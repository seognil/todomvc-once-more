import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./TodoApp";

createApp(App).use(createPinia()).mount("#app");
