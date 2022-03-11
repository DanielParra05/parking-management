import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import ParkingForm from "../views/ParkingForm.vue";
import Login from "../views/Login.vue";
import { authGuard } from "./guard";
import CurrentOcupation from "../views/CurrentOcupation.vue";

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
    path: "/current-ocupation",
    name: "current-ocupation",
    component: CurrentOcupation,
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
