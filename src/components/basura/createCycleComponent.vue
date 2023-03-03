<template>
  <div class="">
    <!-- q-pa-md q-gutter-sm -->
    <q-dialog v-model="boardStore.btncyclecreate" persistent>
      <q-card style="min-width: 400px">
        <div class="q-pa-md">
          <div class="text-h6">Crear Ciclo</div>
          <q-separator></q-separator>
        </div>

        <q-form class="q-pa-md" @submit.prevent="CrearCiclo">
          <q-input
            v-model="boardStore.NombreCiclo"
            label="Nombre"
            placeholder="Ingrese Nombre"
            :rules="[
              (val) => (val && val.length > 0) || 'Porfavor Ingrese Nombre(s)',
            ]"
          />

          <q-card-actions align="right" class="text-primary">
            <br />
            <q-btn flat label="Cancelar" class="text-negative" v-close-popup />
            <q-btn
              flat
              label="Guardar"
              type="submit"
              :loading="loading"
              v-close-popup
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useBoardStore } from "src/stores/board-store";

import { ref } from "@vue/reactivity";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";

const $q = useQuasar();
const promt = ref(false);
const boardStore = useBoardStore();

const loading = ref(false);

/* const p = defineProps({
  idBoad: Number,
}); */
const route = useRoute();
const idtablero = route.params.idBoard;

const CrearCiclo = async () => {
  try {
    const msg = boardStore.NombreCiclo;
    const res = await boardStore.createCycle(msg, idtablero);
    boardStore.NombreCiclo = "";
    await boardStore.getCycles(idtablero);
    $q.notify({
      type: "positive",
      message: "Se creó el Ciclo con Exito",
    });
  } catch (error) {
    console.log(error);
    $q.notify({
      type: "negative",
      message: "Intente Nuevamente - " + error.error,
    });
  } finally {
    loading.value = false;
  }
};
</script>
