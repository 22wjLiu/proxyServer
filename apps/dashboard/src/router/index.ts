import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes as RouteRecordRaw[],
});

router.beforeEach((to, _from, next) => {
  const pageTitle = to.meta.title as string;
  const siteTitle = "管理面板";
  document.title = pageTitle ? `${siteTitle}-${pageTitle}` : siteTitle;
  next();
});

export default router;
