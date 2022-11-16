import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
if (typeof window !== "undefined") import("./sw");

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
