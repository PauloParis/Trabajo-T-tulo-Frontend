<template>
  <div>
    <q-dialog v-model="boardStore.openDialogCreate" persistent>
      <q-card style="width: 400px">
        <div class="q-pa-md">
          <div class="text-h6">Crear Tablero</div>
          <q-separator></q-separator>
        </div>

        <q-form class="q-pa-md" @submit.prevent="CrearTablero">
          <q-input
            v-model="boardStore.infoTablero.NombreTablero"
            label="Nombre"
            placeholder="Ingrese Nombre"
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Porfavor Ingrese Algún Nombre',
              (val) =>
                (val.length > 0 && val.length < 25) ||
                'No se permiten mas caracteres',
            ]"
          />

          <q-input
            v-model.number="boardStore.infoTablero.Semestre"
            type="number"
            label="Semestre"
            placeholder="Ingrese Semestre"
            style="max-width: "
            :rules="[
              (val) =>
                (val > 0 && val < 1000) ||
                'Porfavor Ingrese un Número Realista',
              (val) =>
                (val !== null && val !== '') || 'PorFavor Ingrese un Semestre',
            ]"
          />
          <br />
          <div class="text-body1 text-grey-8">Seleccione color de fondo:</div>
          <br />
          <div align="center">
            <q-color
              v-model="boardStore.infoTablero.Color"
              default-view="tune"
            />
          </div>
          <br />
          <q-card-actions align="right" class="text-primary">
            <br />
            <q-btn flat label="Cancelar" class="text-negative" v-close-popup />
            <q-btn flat label="Guardar" type="submit" v-close-popup />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useBoardStore } from "src/stores/board-store";
import { useNotify } from "src/composables/notifyHook";
import { useQuasar } from "quasar";

const boardStore = useBoardStore();
const { successNotify, errorNotify } = useNotify();
const $q = useQuasar();

const CrearTablero = async () => {
  try {
    $q.loading.show();
    await boardStore.createBoard();
    successNotify("Se creó el tablero con éxito");
  } catch (error) {
    errorNotify(error);
  } finally {
    $q.loading.hide();
    boardStore.infoTablero = {
      NombreTablero: "",
      Semestre: "",
      Color: "#b2b2b2",
    };
  }
};
</script>
