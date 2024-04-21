import { createRouter, createWebHashHistory } from "vue-router";
import App from "../App.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/LoginView.vue"),
  },
  {
    path: "/data",
    name: "data",
    component: () => import("../components/DataView.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../components/AdminView.vue"),
    children: [
      {
        path: "/device/info",
        name: "info",
        component: () => import("../components/admin/device/DeviceInfo.vue"),
      },
      {
        path: "/device/param",
        name: "param",
        component: () => import("../components/admin/device/DeviceParam.vue"),
      },
      {
        path: "/device/DFU",
        name: "DFU",
        component: () => import("../components/admin/device/DeviceDFU.vue"),
      },
      {
        path: "/database",
        name: "database",
        component: () => import("../components/admin/Database.vue"),
      },
      {
        path: "/maintainer",
        name: "maintainer",
        component: () => import("../components/admin/Maintainer.vue"),
      },
      {
        path: "/log",
        name: "log",
        component: () => import("../components/admin/Log.vue"),
      },
      {
        path: "/user/info",
        name: "user",
        component: () => import("../components/admin/user/UserInfo.vue"),
      },
      {
        path: "/user/switch",
        name: "switch",
        redirect: "/login",
        component: () => import("../components/admin/user/UserSwitch.vue"),
      },
      {
        path: "/user/exit",
        name: "exit",
        component: () => import("../components/admin/user/UserExit.vue"),
      },
      // {
      //   path: "/user/resetPassword",
      //   name: "reset",
      //   component: () => import("../components/user/UserResetPassword.vue"),
      // },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
