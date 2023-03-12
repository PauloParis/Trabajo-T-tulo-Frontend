<template>
  <div class="q-pa-md"></div>

  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="boardStore.openDialogDisassociate" persistent>
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6">Desvincularse del Tablero</div>
          <q-separator></q-separator>
        </q-card-section>

        <div class="q-pa-md">
          <div class="text-center text-body1 text-red">
            ¿Está seguro(a) de querer desvincularse del Tablero?
          </div>
        </div>

        <br />
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" class="text-negative" v-close-popup />
          <q-btn flat label="Confirmar" @click="disassociate" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useBoardStore } from "src/stores/board-store";
import { useNotify } from "src/composables/notifyHook";
import { useAccessStore } from "src/stores/access-store";
import { useQuasar } from "quasar";

const boardStore = useBoardStore();
const accessStore = useAccessStore();
const { successNotify, errorNotify } = useNotify();
const $q = useQuasar();

const disassociate = async () => {
  try {
    $q.loading.show();
    await boardStore.disassociateBoard(accessStore.infoUsuario.idUsuario);
    successNotify("Fuiste Desvinculado del Tablero Correctamente");
    if (boardStore.infoTablero.IdTablero == localStorage.getItem("keyboard")) {
      localStorage.removeItem("keyuser");
      localStorage.removeItem("happyboard");
      localStorage.removeItem("board");
      localStorage.removeItem("keyboard");
    }
  } catch (error) {
    errorNotify(error);
  } finally {
    $q.loading.hide();
  }
};
</script>
