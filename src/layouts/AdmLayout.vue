<template>
  <div>
    <q-layout view="hHh lpR fFf">
      <q-header elevated class="bg-light-blue-9">
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer()"
          />
          <img
            class="q-pl-xs"
            src="src/assets/logocolor.png"
            width="35"
            height="40"
          />
          <q-toolbar-title> ÍNDICE DE FELICIDAD </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="270"
        :breakpoint="500"
        elevated
        class="bg-white"
      >
        <q-scroll-area class="fit">
          <q-list padding>
            <q-item-label header>Perfil</q-item-label>
            <q-item
              clickable
              v-ripple
              active-class="my-menu-link"
              exact
              to="/Account"
            >
              <q-item-section avatar>
                <q-icon name="account_circle" />
              </q-item-section>
              <q-item-section> Cuenta </q-item-section>
            </q-item>

            <br />
            <q-item-label header>Tableros</q-item-label>
            <q-item
              clickable
              v-ripple
              active-class="my-menu-link"
              @click="link = 'Mis_Tableros'"
              to="/MyBoard"
            >
              <q-item-section avatar>
                <q-icon name="home" />
                <!--send-->
              </q-item-section>
              <q-item-section> Mis Tableros </q-item-section>
            </q-item>
            <!--:active="link === 'Tableros_Invitado'"-->
            <q-item
              clickable
              v-ripple
              active-class="my-menu-link"
              @click="link = 'Tableros_Invitado'"
              to="/GuestBoard"
            >
              <q-item-section avatar>
                <q-icon name="dashboard" />
                <!--send-->
              </q-item-section>
              <q-item-section> Tableros Invitado </q-item-section>
            </q-item>

            <br v-if="!manageadmin" />
            <q-item-label v-if="!manageadmin" header
              >Administración</q-item-label
            >

            <q-item
              v-if="!manageadmin"
              clickable
              v-ripple
              active-class="my-menu-link"
              @click="link = 'manage_board'"
              to="/ManageBoard"
            >
              <q-item-section avatar>
                <q-icon name="assignment" />
              </q-item-section>
              <q-item-section> Gestión de Tableros </q-item-section>
            </q-item>
            <!---->
            <q-item
              v-if="!manageadmin"
              clickable
              v-ripple
              active-class="my-menu-link"
              @click="link = 'Métricas'"
              to="/Metric"
            >
              <q-item-section avatar>
                <q-icon name="query_stats" />
              </q-item-section>
              <q-item-section> Métricas </q-item-section>
            </q-item>

            <!---->
            <q-item
              v-if="!manageadmin"
              clickable
              v-ripple
              active-class="my-menu-link"
              @click="link = 'Gestion_Cuenta'"
              to="/ManageAccount"
            >
              <q-item-section avatar>
                <q-icon name="manage_accounts" />
              </q-item-section>
              <q-item-section> Gestión de cuentas </q-item-section>
            </q-item>
            <!---->
            <br />
            <q-item-label header>Otros</q-item-label>

            <q-item
              clickable
              v-ripple
              active-class="my-menu-link"
              @click="link = 'settings'"
              to="/Setting"
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
              @click="link = 'Ayuda'"
              to="/Help"
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
              @click="(link = 'CerrarSesion'), logout()"
              to="/Logout"
            >
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section> Cerrar Sesión </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
/* import EssentialLink from "components/EssentialLink.vue"; */
import { useAccessStore } from "../stores/access-store";
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
import { useBoardStore } from "src/stores/board-store";

//Boton visualización drawer
const leftDrawerOpen = ref(false);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const accessStore = useAccessStore();
const router = useRouter();

const manageadmin = ref(false);

if (!sessionStorage.getItem("admin")) {
  manageadmin.value = true;
}

const logout = async () => {
  await accessStore.logout();
  router.push("/login");
};
</script>

<style lang="scss" scoped>
.my-menu-link {
  color: #1976d2;
  //background: Black;
}
</style>
