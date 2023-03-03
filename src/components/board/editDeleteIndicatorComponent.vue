<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="boardStore.btnviewindicator">
      <q-card style="width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Editar o Eliminar Indicador</div>

          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator inset></q-separator>
        <q-form
          class="q-pa-md row items-center"
          @submit.prevent="editarIndicador"
        >
          <div class="col-10">
            <!-- input con el nomnbre del indicador -->
            <q-input
              v-model="boardStore.NombreIndicador"
              label="Nombre"
              placeholder="Ingrese Nombre"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Porfavor Escriba un Nombre',
              ]"
            />
          </div>
          <!-- btn para eliminar indicador -->
          <div class="col-2 text-center">
            <q-btn
              class="bg-red"
              glossy
              style="height: 30px; width: 40px"
              icon="delete"
              color="white"
              @click="
                (boardStore.openDialogDelete = true),
                  (boardStore.TituloDelete = 'Indicador')
              "
            ></q-btn>
          </div>

          <br />
          <q-card-actions class="text-primary" style="width: 100%">
            <q-btn
              style="width: 100%"
              outline
              label="Guardar Cambios"
              type="submit"
              v-close-popup
            />
          </q-card-actions>
        </q-form>
      </q-card>

      <deleteComponent></deleteComponent>
    </q-dialog>
  </div>
</template>

<script setup>
import { useBoardStore } from "src/stores/board-store";
import deleteComponent from "src/components/board/deleteComponent.vue";

import { useNotify } from "src/composables/notifyHook";
import { useRoute } from "vue-router";

import socket from "src/stores/socket-store";

const { successNotify, errorNotify } = useNotify();
const route = useRoute();

const boardStore = useBoardStore();

const editarIndicador = async () => {
  try {
    const data = {
      ID_Indicador: boardStore.idIndicador,
      Nombre_Indicador: boardStore.NombreIndicador,
    };
    await boardStore.editIndicator(data);
    await boardStore.getIndicator(boardStore.idTablero);
    successNotify("El datos del indicador fueron actualizados correctamente");
  } catch (error) {
    errorNotify(error.error);
  }
};

const props = defineProps({
  idBoard: Number,
  nameBoard: String,
  happyBoard: Number,
  idName: Number,
  nameUser: String,
  surnameUser: String,
  typeUser: String,
  userCategory: String,
});

socket.on("indicadores", (msg) => {
  boardStore.MisIndicadores.push(msg);
});
socket.on("eliminarIndicador", (remove) => {
  boardStore.MisIndicadores = remove;
});
</script>
