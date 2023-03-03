<template>
  <div class="q-pa-md"></div>

  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="boardStore.btndisassociate" persistent>
      <q-card style="width: 500px">
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

const { successNotify, errorNotify } = useNotify();
const boardStore = useBoardStore();
const accessStore = useAccessStore();

const disassociate = async () => {
  try {
    await boardStore.disassociateBoard(
      boardStore.idTablero,
      accessStore.idUsuario
    );
    successNotify("Fuiste Desvinculado del Tablero Correctamente");
  } catch (error) {
    errorNotify(error.error);
  }
};
</script>
