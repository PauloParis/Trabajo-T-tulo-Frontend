<template>
  <div>
    <q-dialog v-model="boardStore.openDialogDelete" persistent>
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6">
            Eliminar
            {{ boardStore.TituloDelete }}
          </div>
          <q-separator></q-separator>
        </q-card-section>

        <div class="q-pa-md">
          <div class="text-red text-center text-body1">
            ¿Está Seguro(a) de querer eliminar el
            {{ boardStore.TituloDelete }} ?
          </div>
        </div>

        <br />

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" class="text-negative" v-close-popup />
          <q-btn
            flat
            label="Confirmar"
            @click="funcionEliminar"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useNotify } from "src/composables/notifyHook";
import { useQuasar } from "quasar";
import { useBoardStore } from "src/stores/board-store";
import socket from "src/composables/socket";

const $q = useQuasar();
const { successNotify, errorNotify } = useNotify();
const boardStore = useBoardStore();

const funcionEliminar = async () => {
  if (boardStore.TituloDelete == "Tablero") {
    $q.loading.show();
    try {
      await boardStore.deleteBoard();
      boardStore.openDialogDelete = false;
      successNotify("El Tablero fue Eliminado Correctamente");
      //vaciar localstorage
      if (
        boardStore.infoTablero.IdTablero == localStorage.getItem("keyboard")
      ) {
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
  }
  if (boardStore.TituloDelete == "Ciclo") {
    $q.loading.show();
    try {
      const { status } = await boardStore.deleteCycle();
      /* SOCKET */
      if (status === 200) {
        socket.emit(
          "eliminarCiclo",
          boardStore.MisCiclos.filter(
            (item) => item.ID_Ciclo !== boardStore.infoCiclo.IdCiclo
          )
        );
      }
      boardStore.openDialogDelete = false;
      successNotify("El Ciclo fue Eliminado Correctamente");
    } catch (error) {
      errorNotify(error);
    } finally {
      $q.loading.hide();
    }
  }
  if (boardStore.TituloDelete == "Indicador") {
    $q.loading.show();
    try {
      const { status } = await boardStore.deleteIndicator(
        boardStore.infoIndicador.IdIndicador
      );
      /* SOCKET */
      if (status === 200) {
        socket.emit(
          "eliminarIndicador",
          boardStore.MisIndicadores.filter(
            (item) => item.ID_Indicador !== boardStore.infoIndicador.IdIndicador
          )
        );
      }
      boardStore.openDialogDelete = false;
      boardStore.openDialogEditDelete = false;
      successNotify("El Indicador fue Eliminado Correctamente");
    } catch (error) {
      errorNotify(error);
    } finally {
      $q.loading.hide();
    }
  }
};
</script>
