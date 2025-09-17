import { createApp } from "vue";
import "@/assets/css/global.css";
import App from "@/App.vue";
import router from "@/router";
import { setupOpenApi, setupAxiosInterceptors } from "./api/config/request";

setupOpenApi(window.__APP_CONFIG__?.API_BASE_URL || "http://localhost:8088");
setupAxiosInterceptors();

createApp(App).use(router).mount("#app");
