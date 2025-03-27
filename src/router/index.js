import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import SignUp from "@/views/SignUp.vue";
import NotFound from '@/views/NotFound.vue';

import Publisher from "@/views/Publisher/Publisher.vue";
import AddPublisher from "@/views/Publisher/AddPublisher.vue";
import EditPublisher from "@/views/Publisher/EditPublisher.vue";
const routes = [
  {
    path: "/",
    name: "home-page",
    component: HomePage,
  },
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
    path: "/publisher",
    name: "publisher",
    component: Publisher,
  },
  {
    path: "/publisher/add",
    name: "add-publisher",
    component: AddPublisher,
  },
  {
    path: "/publisher/edit/:id",
    name: "edit-publisher",
    component: EditPublisher,
    props: true,
  },
  // {
  //   path: "/publisher/add",
  //   name: "add-publisher",
  //   component: AddPublisher,
  // },
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

router.beforeEach((to, from, next) => {
  const isLogin = store.getters.isAuthenticated;

  if (isLogin) {
    return next();
  } else {
    if (to.name == "login" || to.name == "home-page" || to.name == "sign-up") {
      return next();
    } else {
      alert("Bạn cần đăng nhập để sử dụng chức năng này");
      return next("/login");
    }
  }
});

export default router;