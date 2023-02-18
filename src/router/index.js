import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

import { useAccessStore } from "src/stores/access-store";
import { useBoardStore } from "src/stores/board-store";

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from, next) => {
    const requireAuth = to.meta.auth;
    const accessStore = useAccessStore();
    const boardStore = useBoardStore();
    const requireAdm = to.meta.admin;
    const requireBoard = to.meta.board;
    //|| userStore.typeUser === 'Administrador'
    //console.log(userStore.token, userStore.typeuser);
    //si existe el token en memoria
    if (accessStore.token) {
      /*if (userStore.typeuser != "Administrador") {
        if (requireAdm === true) {
          return next("/account");
        }
      }*/

      return next();
    }

    if (requireBoard) {
      if (!(document.cookie === `board=${boardStore.NombreTablero}`)) {
        return next("/account");
      }
    }

    if (!sessionStorage.getItem("admin") && requireAdm) {
      return next("/account");
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
