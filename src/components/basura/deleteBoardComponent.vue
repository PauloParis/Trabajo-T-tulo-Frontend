<template>
  <div class="q-pa-md">
    <q-dialog v-model="boardStore.btndelete" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Eliminar Tablero</div>
          <q-separator></q-separator>
        </q-card-section>

        <div class="q-pa-md column items-center">
          <label class="text- text-red">
            ¿Está Seguro de querer eliminar el Tablero?
          </label>
        </div>

        <br />
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" class="text-negative" v-close-popup />
          <q-btn flat label="Confirmar" @click="removeBoard" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useBoardStore } from "src/stores/board-store";
import { useQuasar } from "quasar";

const $q = useQuasar();

const boardStore = useBoardStore();

const removeBoard = async () => {
  try {
    const id = boardStore.idTablero;
    await boardStore.deleteBoard(id);
    $q.notify({
      type: "positive",
      message: "El Tablero fue Eliminado Correctamente",
    });
  } catch (error) {
    $q.notify({
      type: "negative",
      message: error.error,
    });
  }
};
</script>
