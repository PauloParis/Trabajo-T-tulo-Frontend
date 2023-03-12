<template>
  <div class="">
    <q-dialog v-model="boardStore.openDialogEditBoard" persistent>
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6">Editar Tablero</div>
          <q-separator></q-separator>
        </q-card-section>

        <q-form class="q-pa-md" @submit.prevent="editarTablero">
          <q-input
            v-model="boardStore.infoTablero.NombreTablero"
            label="Nombre"
            placeholder="Ingrese Nombre"
            :rules="[
              (val) => (val && val.length > 0) || 'Porfavor Escriba un Nombre',
              (val) =>
                (val.length > 0 && val.length < 25) ||
                'No se permiten mas caracteres',
            ]"
          />

          <q-input
            v-model.number="boardStore.infoTablero.Anio"
            type="number"
            label="Año"
            placeholder="Ingrese Año"
            style="max-width: "
            :rules="[
              (val) =>
                (val > 999 && val < 10000) ||
                'Porfavor Ingrese un Número Positivo de 4 Dígitos',
              (val) =>
                (val !== null && val !== '') || 'PorFavor Ingrese un Año',
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
                'Porfavor Ingrese un Número Positivo',
              (val) =>
                (val !== null && val !== '') || 'PorFavor Ingrese un Semestre',
            ]"
          />

          <label class="text-body1 text-grey-8">Seleccione color:</label>
          <br />
          <br />
          <div align="center">
            <q-color
              v-model="boardStore.infoTablero.Color"
              class=""
              default-view="tune"
            />
          </div>
          <br />
          <q-card-actions align="right" class="text-primary">
            <q-btn
              flat
              label="Cancelar"
              @click="
                (boardStore.infoTablero.NombreTablero = ''),
                  (boardStore.infoTablero.Semestre = '')
              "
              class="text-negative"
              v-close-popup
            />
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

const editarTablero = async () => {
  try {
    $q.loading.show();
    await boardStore.editBoard();
    successNotify("Los Datos del Tablero fueron Actualizados Correctamente");
    boardStore.infoTablero = {
      NombreTablero: "",
      Semestre: "",
    };
  } catch (error) {
    errorNotify(error);
  } finally {
    $q.loading.hide();
  }
};
</script>
