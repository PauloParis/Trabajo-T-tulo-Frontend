<template>
  <div class="q-pa-md"></div>

  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="boardStore.btndeletecycle" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Eliminar Ciclo</div>
          <q-separator></q-separator>
        </q-card-section>

        <div class="q-pa-md column items-center">
          <label class="col text-h6 text-red">
            ¿Está Seguro de querer eliminar el Ciclo?
          </label>
        </div>

        <br />
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" class="text-negative" v-close-popup />
          <q-btn flat label="Confirmar" @click="removeCycle" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useBoardStore } from "src/stores/board-store";
import { useQuasar } from "quasar";

const $q = useQuasar();

const promt = ref(false);
const boardStore = useBoardStore();

const removeCycle = async () => {
  try {
    const id = boardStore.idCiclo;
    await boardStore.deleteCycle(id);
    $q.notify({
      type: "positive",
      message: "El Ciclo fue Eliminado Correctamente",
    });
  } catch (error) {
    $q.notify({
      type: "negative",
      message: error.error,
    });
  }
};
</script>
