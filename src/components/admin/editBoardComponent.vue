<template>
  <div>
    <q-dialog v-model="adminStore.btnedit" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Editar Tablero</div>
          <q-separator></q-separator>
        </q-card-section>

        <q-form class="q-pa-md" @submit.prevent="editarTablero">
          <q-input
            v-model="adminStore.nombreTablero"
            label="Nombre"
            placeholder="Ingrese Nombre"
            :rules="[
              (val) => (val && val.length > 0) || 'Porfavor Escriba un Nombre',
              (val) =>
                (val.length > 0 && val.length < 36) ||
                'No se permiten mas caracteres',
            ]"
          />

          <q-input
            v-model="adminStore.anio"
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
            v-model="adminStore.semestre"
            type="number"
            label="Semestre"
            placeholder="Ingrese Semestre"
            style="max-width: "
            :rules="[
              (val) =>
                (val > 0 && val < 100) || 'Porfavor Ingrese un Número Positivo',
              (val) =>
                (val !== null && val !== '') || 'PorFavor Ingrese un Semestre',
            ]"
          />

          <br />
          <q-card-actions align="right" class="text-primary">
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
import { useAdminStore } from "src/stores/admin-store";

const { successNotify, errorNotify } = useNotify();
//const prompt = ref(false);

const storeBoard = useBoardStore();
const adminStore = useAdminStore();

const editarTablero = async () => {
  try {
    await adminStore.editAdminBoard();
    successNotify("El Datos del tablero fueron Actualizados Correctamente");
  } catch (error) {
    errorNotify(error.error);
  }
};
</script>
