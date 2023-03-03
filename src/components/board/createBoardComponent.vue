<template>
  <div>
    <q-dialog v-model="boardStore.btncreate" persistent>
      <q-card style="min-width: 400px">
        <div class="q-pa-md">
          <div class="text-h6">Crear Tablero</div>
          <q-separator></q-separator>
        </div>

        <q-form class="q-pa-md" @submit.prevent="CrearTablero">
          <q-input
            v-model="boardStore.NombreTablero"
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
            v-model.number="boardStore.Semestre"
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
            <q-color v-model="boardStore.Color" default-view="tune" />
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
import { ref } from "vue";
import { useBoardStore } from "src/stores/board-store";
import { useNotify } from "src/composables/notifyHook";

const { successNotify, errorNotify } = useNotify();
//const promt = ref(false);
const boardStore = useBoardStore();

const CrearTablero = async () => {
  try {
    const res = await boardStore.createBoard();
    successNotify("Se creó el Tablero con Exito");
  } catch (error) {
    errorNotify(error.error);
  }
};
</script>
