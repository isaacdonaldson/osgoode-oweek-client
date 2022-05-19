import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "about" */ "../views/Home.vue"),
  },
  {
    path: "/events",
    name: "Events",
    component: () => import(/* webpackChunkName: "about" */ "../views/Events.vue"),
  },
  {
    path: "/admin/list",
    name: "Event List",
    component: () => import(/* webpackChunkName: "about" */ "../views/Admin/List.vue"),
  },
  {
    path: "/admin/edit/:id",
    name: "Event Edit",
    component: () => import(/* webpackChunkName: "about" */ "../views/Admin/Edit.vue"),
  },
  {
    path: "/team",
    name: "Team",
    component: () => import(/* webpackChunkName: "about" */ "../views/Team.vue"),
  },
  // {
  //   path: '/test',
  //   name: 'Test',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Test.vue')
  // },
  {
    path: "/:pathMatch(.*)*",
    name: "404Page",
    component: () => import(/* webpackChunkName: "about" */ "../views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
