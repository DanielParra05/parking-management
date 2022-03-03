import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import ParkingForm from "../views/ParkingForm.vue";

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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
