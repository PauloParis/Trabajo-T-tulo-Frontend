<template>
  <div class="q-pa-md"></div>

  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="storeBoard.btndisassociate" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Desvincularse del Tablero</div>
          <q-separator></q-separator>
        </q-card-section>

        <div class="q-pa-md column items-center">
          <label class="col text-h6 text-red">
            ¿Está Seguro de querer desvincularse del Tablero?
          </label>
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
import { useQuasar } from "quasar";

const $q = useQuasar();
const storeBoard = useBoardStore();

const disassociate = async () => {
  try {
    const id = storeBoard.idTablero;

    //await trayendo a todos los indicadores
    //hago un ciclo for con los indicadores traidos
    //array donde guardo el id de cada indicador
    //hago un ciclo for, con el array
    //llamo a la funcion de happyindicador

    let indicadores = [];
    await storeBoard.getIndicatorsdisconnect(id);
    for (var i = 0; i < storeBoard.INDICADORESDISCONNET.length; i++) {
      indicadores[i] = storeBoard.INDICADORESDISCONNET[i].ID_Indicador;
    }

    for (var i = 0; i < indicadores.length; i++) {
      let id = indicadores[i];
      await storeBoard.happyIndicator(id);
    }

    await storeBoard.disassociateBoard(id);
    indicadores = [];
    $q.notify({
      type: "positive",
      message: "Fuiste Desvinculado del Tablero Correctamente",
    });
  } catch (error) {
    $q.notify({
      type: "negative",
      message: error.error,
    });
  }
};
</script>
