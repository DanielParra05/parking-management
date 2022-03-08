import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import ParkingForm from "../views/ParkingForm.vue";
import Login from "../views/Login.vue";
import { authGuard } from "./guard";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: [authGuard],
  },
  {
    path: "/parking-form",
    name: "parking-form",
    component: ParkingForm,
    beforeEnter: [authGuard],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
