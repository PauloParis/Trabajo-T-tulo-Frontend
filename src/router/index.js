import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

import { useAccessStore } from "src/stores/access-store";

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from, next) => {
    const requireAuth = to.meta.auth;
    const accessStore = useAccessStore();
    const requireAdm = to.meta.admin;
    const requireBoard = to.meta.board;

    // si existe el token en memoria
    if (accessStore.token) {
      return next();
    }

    // si quiere ingresar a la page de un grupo
    if (requireBoard && !localStorage.getItem("board")) {
      return next("/");
    }

    // si quiere ingresar a la page de un admin
    if (!sessionStorage.getItem("admin") && requireAdm) {
      return next("/");
    }

    //si no existe el token(se refresco el sitio web)
    if (requireAuth || sessionStorage.getItem("user")) {
      await accessStore.refreshToken();
      if (accessStore.token) {
        return next();
      }
      return next("/login");
    }
    return next();
  });

  return Router;
});
