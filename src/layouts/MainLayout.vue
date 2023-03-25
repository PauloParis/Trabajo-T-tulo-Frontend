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
          <div class="q-pl-xs q-ml-sm q-mr-sm logo" />
          <q-toolbar-title> ÍNDICE DE FELICIDAD </q-toolbar-title>
          <!-- <q-toolbar-title> -->
          <q-btn size="sm" round icon="notifications" class="bg-dark">
            <q-badge
              v-if="accessStore.notificacion.length != 0"
              floating
              color="red"
              rounded
            />

            <q-menu>
              <q-list
                v-for="(noti, index) in accessStore.notificacion"
                :key="index"
                style="width: 200px"
                class="row justify-center"
              >
                <div class="q-pa-sm text-body2 text-blue-grey-14">
                  Fuiste agregado al grupo:
                </div>
                <div class="text-body1 text-primary text-weight-bold">
                  {{ noti.tablero.Nombre_Tablero }}
                </div>
                <q-btn
                  @click="notifyDone(noti.tablero.ID_Tablero)"
                  style="width: 100%"
                  class="bg-positive text-white q-ma-sm"
                  size="sm"
                  icon="done"
                ></q-btn>
              </q-list>
            </q-menu>
          </q-btn>

          <!-- </q-toolbar-title> -->
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
            <q-item clickable v-ripple active-class="my-menu-link" exact to="/">
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
                <q-icon name="other_houses" />
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
import { useAccessStore } from "../stores/access-store";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useBoardStore } from "src/stores/board-store";
import { useNotify } from "src/composables/notifyHook";
import { useQuasar } from "quasar";

const { errorNotify } = useNotify();
const $q = useQuasar();

//Boton visualización drawer
const leftDrawerOpen = ref(false);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const accessStore = useAccessStore();
const boardStore = useBoardStore();
const router = useRouter();

accessStore.getInfoUser();

const manageadmin = ref(false);

if (!sessionStorage.getItem("admin")) {
  manageadmin.value = true;
}

const logout = async () => {
  await accessStore.logout();
  router.push("/login");
};

const notifyDone = async (idTablero) => {
  try {
    $q.loading.show();
    await boardStore.updateNotify(idTablero);
  } catch (error) {
    errorNotify(error);
  } finally {
    $q.loading.hide();
  }
};
</script>
