<template>
  <div>
    <q-dialog v-model="adminStore.openDialogUserInfo" persistent>
      <q-card style="width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Información Usuario</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator inset></q-separator>

        <div class="row q-pa-md">
          <div class="col-6 q-pb-sm text-body1 text-weight-medium blue-grey-10">
            Nombre:
          </div>
          <div class="col-6 text-body1 blue-grey-14">
            {{ adminStore.usuarioInfo.name }}
            {{ adminStore.usuarioInfo.surname }}
          </div>
          <div class="col-6 q-pb-sm text-body1 text-weight-medium blue-grey-10">
            Email:
          </div>
          <div class="col-6 text-body1 blue-grey-14">
            {{ adminStore.usuarioInfo.email }}
          </div>
          <div class="col-6 q-pb-sm text-body1 text-weight-medium blue-grey-10">
            Pais:
          </div>
          <div class="col-6 text-body1 blue-grey-14">
            {{ adminStore.usuarioInfo.country }}
          </div>
          <div class="col-6 q-pb-sm text-body1 text-weight-medium blue-grey-10">
            Tipo de Usuario:
          </div>
          <div class="col-6 text-body1 blue-grey-14">
            {{ adminStore.usuarioInfo.type }}
          </div>
          <div
            class="col-6 q-pb-sm text-body1 text-weight-medium blue-grey-10 text-primary"
          >
            Categoria del Usuario:
          </div>
          <div
            class="col-6 text-body1 blue-grey-14 text-uppercase text-weight-medium text-primary"
          >
            {{ adminStore.usuarioInfo.category }}
          </div>
          <div class="col-6 q-mb-sm text-body1 text-weight-medium blue-grey-10">
            Descripción:
          </div>
          <div class="col-6 text-body1 blue-grey-14 q-pa-sm bg-grey-2">
            <q-scroll-area
              :thumb-style="thumbStyle"
              :bar-style="barStyle"
              style="height: 80px"
            >
              <div v-html="adminStore.usuarioInfo.description"></div>
            </q-scroll-area>
          </div>
        </div>
        <q-card-actions class="q-mb-lg">
          <q-btn
            @click="cambiarCategoria"
            label="Cambiar Categoria"
            style="width: 100%"
            class="bg-primary text-white q-mb-md"
          ></q-btn>

          <q-btn
            @click="desvincularUsuario"
            class="text-white no-margin bg-negative"
            label="Desvincular"
            style="width: 100%"
            outline
            v-close-popup
            ><q-tooltip class="bg-purple text-body2 column"
              ><div class="">
                Si desvincula al usuario 'CREADOR', se eliminará el tablero y
                toda su información
              </div>
            </q-tooltip></q-btn
          >
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useNotify } from "src/composables/notifyHook";
import { useAdminStore } from "src/stores/admin-store";
import { useBoardStore } from "src/stores/board-store";
import { useQuasar } from "quasar";

const adminStore = useAdminStore();
const boardSore = useBoardStore();
const { successNotify, errorNotify } = useNotify();
const $q = useQuasar();

const thumbStyle = {
  right: "4px",
  borderRadius: "5px",
  backgroundColor: "#027be3",
  width: "5px",
  opacity: 0.75,
};

const barStyle = {
  right: "2px",
  borderRadius: "9px",
  backgroundColor: "#027be3",
  width: "9px",
  opacity: 0.2,
};

const cambiarCategoria = async () => {
  try {
    $q.loading.show();
    if (adminStore.usuarioInfo.category === "Creador") {
      adminStore.usuarioInfo.category = "Invitado";
      await adminStore.changeCategory();
    } else {
      adminStore.usuarioInfo.category = "Creador";
      await adminStore.changeCategory();
    }
    successNotify("Se Cambio la categoria del usuario");
  } catch (error) {
    errorNotify(error);
  } finally {
    $q.loading.hide();
  }
};

const desvincularUsuario = async () => {
  try {
    $q.loading.show();
    (boardSore.infoTablero.IdTablero = adminStore.infoTablero.IdTablero),
      await boardSore.disassociateBoard(adminStore.usuarioInfo.id);
    successNotify("Se desvinculó al usuario del tablero");
  } catch (error) {
    errorNotify(error);
  } finally {
    $q.loading.hide();
  }
};
</script>
