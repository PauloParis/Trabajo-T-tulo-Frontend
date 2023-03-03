<template>
  <div>
    <q-dialog v-model="adminStore.btnOpenUserInfo" persistent>
      <q-card style="min-width: 400px">
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
            {{ adminStore.nombreUser }} {{ adminStore.apellidoUser }}
          </div>
          <div class="col-6 q-pb-sm text-body1 text-weight-medium blue-grey-10">
            Email:
          </div>
          <div class="col-6 text-body1 blue-grey-14">
            {{ adminStore.emailUser }}
          </div>
          <div class="col-6 q-pb-sm text-body1 text-weight-medium blue-grey-10">
            Pais:
          </div>
          <div class="col-6 text-body1 blue-grey-14">
            {{ adminStore.paisUser }}
          </div>
          <div class="col-6 q-pb-sm text-body1 text-weight-medium blue-grey-10">
            Tipo de Usuario:
          </div>
          <div class="col-6 text-body1 blue-grey-14">
            {{ adminStore.tipoUser }}
          </div>
          <div
            class="col-6 q-pb-sm text-body1 text-weight-medium blue-grey-10 text-primary"
          >
            Categoria del Usuario:
          </div>
          <div
            class="col-6 text-body1 blue-grey-14 text-uppercase text-weight-medium text-primary"
          >
            {{ adminStore.categoriaUser }}
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
              <div v-html="adminStore.descripcionUser"></div>
            </q-scroll-area>
          </div>
        </div>
        <q-card-actions align="right" class="text-primary q-mb-lg">
          <q-btn
            @click="desvincularUsuario"
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
          >>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useNotify } from "src/composables/notifyHook";
import { useAdminStore } from "src/stores/admin-store";
import { useBoardStore } from "src/stores/board-store";

const { successNotify, errorNotify } = useNotify();
const adminStore = useAdminStore();
const boardSore = useBoardStore();

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

const desvincularUsuario = async () => {
  try {
    await boardSore.disassociateBoard(adminStore.idTablero, adminStore.idUser);
    //getUserBoard(adminStore.idTablero);
    successNotify("Se desvinculó al usuario del tablero");
  } catch (error) {
    errorNotify(error.error);
  }
};
</script>
