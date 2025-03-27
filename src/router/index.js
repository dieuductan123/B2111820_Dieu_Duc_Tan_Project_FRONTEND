import { createWebHistory, createRouter } from "vue-router";

import Login from "@/views/Login.vue";
import SignUp from "@/views/SignUp.vue";
import NotFound from '@/views/NotFound.vue';
const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/signup",
    name: "sign-up",
    component: SignUp,
  },
  {
    path: "/:pathMatch(.*)*", // Sửa lại `patchMatch` thành `pathMatch`
    name: "not_found",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;