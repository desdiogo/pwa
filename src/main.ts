import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

import { useRegisterSW } from 'virtual:pwa-register/vue';

const intervalMS = 60 * 60 * 1000;

useRegisterSW({
  onRegisteredSW(_, r) {
    r &&
      setInterval(() => {
        console.log(_)
        r.update();
      }, intervalMS);
  },
});

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
