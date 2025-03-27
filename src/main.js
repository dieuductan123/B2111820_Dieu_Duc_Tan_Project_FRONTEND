import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@popperjs/core";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { createApp } from "vue";
import App from "./App.vue";

import router from "@/router";

createApp(App).use(router).mount("#app");
