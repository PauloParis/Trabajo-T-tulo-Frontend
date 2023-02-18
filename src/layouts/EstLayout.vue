<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="drawer = !drawer" />

        <q-toolbar-title> Índice de Felicidad 🙂😐🙁 </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :width="200"
      :breakpoint="500"
      bordered
      class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item-label header>Perfil</q-item-label>
          <q-item
            clickable
            v-ripple
            active-class="my-menu-link"
            :active="link === 'Cuenta'"
            @click="link = 'Cuenta'"
            exact
            to="/"
          >
            <q-item-section avatar>
              <q-icon name="account_circle" />
            </q-item-section>
            <q-item-section> Cuenta </q-item-section>
          </q-item>

          <q-item-label header>Tableros</q-item-label>
          <q-item
            clickable
            v-ripple
            active-class="my-menu-link"
            :active="link === 'Tableros'"
            @click="link = 'Tableros'"
            to="/MisTableros"
          >
            <q-item-section avatar>
              <q-icon name="home" />
              <!--send-->
            </q-item-section>
            <q-item-section> Mis Tableros </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            active-class="my-menu-link"
            :active="link === 'Tableros'"
            @click="link = 'Tableros'"
            to="/TablerosInvitado"
          >
            <q-item-section avatar>
              <q-icon name="dashboard" />
              <!--send-->
            </q-item-section>
            <q-item-section> Tableros Invitado </q-item-section>
          </q-item>

          <q-item-label header>Otros</q-item-label>

          <q-item
            clickable
            v-ripple
            active-class="my-menu-link"
            :active="link === 'settings'"
            @click="link = 'settings'"
          >
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>
            <q-item-section> Configuración </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            active-class="my-menu-link"
            :active="link === 'Ayuda'"
            @click="link = 'Ayuda'"
          >
            <q-item-section avatar>
              <q-icon name="help" />
            </q-item-section>
            <q-item-section> Sobre Índice de felicidad </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            active-class="my-menu-link"
            :active="link === 'CerrarSesion'"
            @click="link = 'CerrarSesion'"
          >
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section> Cerrar Sesión </q-item-section>
          </q-item>

          <!--<q-separator :key="'sep' + index" v-if="menuItem.separator" />-->
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      drawer: ref(false),
      //menuList,
      link: ref("Cuenta"),
    };
  },
};
</script>
