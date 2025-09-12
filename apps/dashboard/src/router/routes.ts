import type {
  RouteLocation,
  RouteLocationRaw,
  RouteComponent,
  RouteRecordRaw,
} from "vue-router";

export interface MetaIcon {
  lib: string;
  name: string;
}

export interface CustomRouteMeta {
  title: string;
  icon: MetaIcon;
}

export interface CustomRouteRecord
  extends Omit<RouteRecordRaw, "meta" | "children"> {
  path: string;
  name?: string;
  component?: RouteComponent;
  redirect?: RouteLocationRaw | ((to: RouteLocation) => RouteLocationRaw);
  children?: CustomRouteRecord[];
  meta?: CustomRouteMeta;
}

const routes: CustomRouteRecord[] = [
  {
    path: "/",
    name: "index",
    redirect: { name: "dashboard" },
    component: () => import("@/components/layout/DashBoardLayout.vue"),
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("@/components/dashboard/DashBoardIndex.vue"),
        meta: {
          title: "首页",
          icon: {
            lib: "",
            name: "",
          },
        },
      },
      {
        path: "/settings",
        name: "settings",
        component: () => import("@/components/dashboard/DashBoardSettings.vue"),
        meta: {
          title: "设置",
          icon: {
            lib: "",
            name: "",
          },
        },
      },
    ],
  },
];

export { routes };
