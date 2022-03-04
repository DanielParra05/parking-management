import store from "@/store"
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router"

export const authGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const isAuthenticated = store.getters.isAuthenticated;
    if (isAuthenticated) {
        next()
        return
    }
    next({ name: 'login' })
}