<template>
  <div>
    <q-dialog v-model="boardStore.openDialog" persistent>
      <q-card style="width: 400px">
        <div class="q-pa-md">
          <div class="text-h6">Crear {{ boardStore.Titulo }}</div>
          <q-separator></q-separator>
        </div>

        <q-form class="q-pa-md" @submit.prevent="funcionCrear">
          <q-input
            v-model="boardStore.input"
            label="Nombre"
            :rules="[
              (val) => (val && val.length > 0) || 'Porfavor Ingrese Nombre',
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
import { useNotify } from "src/composables/notifyHook";
import { useBoardStore } from "src/stores/board-store";
import { ref } from "vue";
import { useRoute } from "vue-router";

const { successNotify, errorNotify } = useNotify();
const boardStore = useBoardStore();
const route = useRoute();
// valor pasar como props

const loading = ref(false);
//const input = ref(null); //traer de la tienda
const idtablero = localStorage.getItem("keyboard"); //route.params.idBoard;

const funcionCrear = async () => {
  if (boardStore.Titulo == "Ciclo") {
    try {
      await boardStore.createCycle(boardStore.input, idtablero);
      await boardStore.getCycles(idtablero);
      await boardStore.getIndicator(idtablero);
      boardStore.openDialog = false;
      successNotify("Se creó el Ciclo con Éxito");
    } catch (error) {
      errorNotify(error.error);
    } finally {
      loading.value = false;
      boardStore.input = null;
    }
  }
  if (boardStore.Titulo == "Indicador") {
    try {
      await boardStore.createIndicator(boardStore.input, idtablero);
      await boardStore.getIndicator(idtablero);
      boardStore.openDialog = false;
      successNotify("Se creó el Indicador con Éxito");
    } catch (error) {
      errorNotify(error.error);
    } finally {
      loading.value = false;
      boardStore.input = null;
    }
  }
};
</script>
