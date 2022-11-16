import { registerSW } from "virtual:pwa-register";

console.log("estou aqui");

registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});
