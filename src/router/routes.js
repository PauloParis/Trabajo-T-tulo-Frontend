import Board from "src/pages/Tableros/BoardPage.vue";

const routes = [
  {
    path: `/board/:nameBoard`,
    name: "board",
    component: Board,
    props: true,
    meta: {
      auth: true,
      board: true,
    },
  },
  //Login-Registro
  {
    path: "/login",
    component: () => import("pages/Acceso/LoginPage.vue"),
  },
  {
    path: "/register",
    component: () => import("pages/Acceso/RegisterPage.vue"),
  },

  //Administrador
  {
    path: "/",
    component: () => import("src/layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        component: () => import("pages/IndexPage.vue"),
        meta: {
          auth: true,
        },
      },
      {
        path: "/myBoard",
        component: () => import("pages/Tableros/MyBoardPage.vue"),
        meta: {
          auth: true,
        },
      },
      {
        path: "/guestBoard",
        component: () => import("pages/Tableros/GuestBoardPage.vue"),
        meta: {
          auth: true,
        },
      },
      {
        path: "/metric",
        component: () => import("pages/Administracion/ManageMetricPage.vue"),
        meta: {
          auth: true,
          admin: true,
        },
      },
      {
        path: "/manageAccount",
        component: () => import("pages/Administracion/ManageUserPage.vue"),
        meta: {
          auth: true,
          admin: true,
        },
      },
      {
        path: "/manageBoard",
        component: () => import("pages/Administracion/ManageBoardPage.vue"),
        meta: {
          auth: true,
          admin: true,
        },
      },
      {
        path: "/setting",
        component: () => import("pages/Otros/SettingPage.vue"),
        meta: {
          auth: true,
        },
      },
      { path: "/help", component: () => import("pages/Otros/HelpPage.vue") },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
