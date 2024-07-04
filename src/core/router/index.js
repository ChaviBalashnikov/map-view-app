import {
    createRouter,
    createWebHashHistory
} from "vue-router";

const routes = [{
    path: "/",
    name: "mainPage",
    component: () => import("@/pages/MainPage.vue"),
}]

export default new createRouter({
    routes,
    history: createWebHashHistory()
})