import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import ParkingForm from "../views/ParkingForm.vue";
import Login from "../views/Login.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/parking-form",
    name: "parking-form",
    component: ParkingForm,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
