<template>
  <div>
    <q-dialog v-model="boardStore.openDialogCreate" persistent>
      <q-card style="width: 400px">
        <div class="q-pa-md">
          <div class="text-h6">Crear {{ boardStore.Titulo }}</div>
          <q-separator></q-separator>
        </div>

        <q-form class="q-pa-md" @submit.prevent="funcionCrear">
          <q-input
            v-model="input"
            label="Nombre"
            :rules="[
              (val) => (val && val.length > 0) || 'Porfavor Ingrese Nombre',
            ]"
          />

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
import { useNotify } from "src/composables/notifyHook";
import { useBoardStore } from "src/stores/board-store";
import { ref } from "vue";
import { useQuasar } from "quasar";
import socket from "src/composables/socket";

const boardStore = useBoardStore();
const { successNotify, errorNotify } = useNotify();
const $q = useQuasar();

const input = ref(null);
const idtablero = localStorage.getItem("keyboard");

const funcionCrear = async () => {
  if (boardStore.Titulo == "Ciclo") {
    try {
      $q.loading.show();
      const { status, ciclo } = await boardStore.createCycle(
        input.value,
        idtablero
      );
      console.log(status, ciclo);
      /* SOCKET */
      if (status === 200) {
        socket.emit("crearCiclo", ciclo);
      }
      await boardStore.getCycles(idtablero);
      await boardStore.getIndicator(idtablero);
      boardStore.openDialog = false;
      successNotify("Se creó el Ciclo con éxito");
    } catch (error) {
      errorNotify(error);
    } finally {
      $q.loading.hide();
      input.value = null;
    }
  }
  if (boardStore.Titulo == "Indicador") {
    try {
      $q.loading.show();
      const { status, indicador } = await boardStore.createIndicator(
        input.value,
        idtablero
      );
      /* SOCKET */
      if (status === 200) {
        socket.emit("crearIndicador", indicador);
      }
      await boardStore.getIndicator(idtablero);
      boardStore.openDialog = false;
      successNotify("Se creó el Indicador con éxito");
    } catch (error) {
      errorNotify(error);
    } finally {
      $q.loading.hide();
      input.value = null;
    }
  }
};
</script>
