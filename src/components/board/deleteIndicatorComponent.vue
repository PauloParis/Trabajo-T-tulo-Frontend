<template>
  <div class="q-pa-md"></div>

  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="boardStore.btndeleteindicator" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Eliminar Ciclo</div>
          <q-separator></q-separator>
        </q-card-section>

        <div class="q-pa-md column items-center">
          <label class="col text-h6 text-red">
            ¿Está Seguro de querer eliminar el Indicador?
          </label>
        </div>

        <br />
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" class="text-negative" v-close-popup />
          <q-btn
            flat
            label="Confirmar"
            @click="removeIndicator"
            v-close-popup
          />
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

const removeIndicator = async () => {
  try {
    const id = boardStore.idIndicador;
    await boardStore.deleteIndicator(id);
    $q.notify({
      type: "positive",
      message: "El Indicador fue Eliminado Correctamente",
    });
  } catch (error) {
    $q.notify({
      type: "negative",
      message: error.error,
    });
  }
};
</script>
