<template>
  <div class="">
    <!-- q-pa-md q-gutter-sm -->
    <q-dialog v-model="boardStore.btnindicatorcreate" persistent>
      <q-card style="min-width: 400px">
        <div class="q-pa-md">
          <div class="text-h6">Crear Indicador</div>
          <q-separator></q-separator>
        </div>

        <q-form class="q-pa-md" @submit.prevent="CrearIndicador">
          <q-input
            v-model="boardStore.NombreIndicador"
            label="Nombre"
            placeholder="Ingrese Nombre + "
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
import { ref } from "@vue/reactivity";
import { useBoardStore } from "src/stores/board-store";
import { useQuasar } from "quasar";

const $q = useQuasar();
const promt = ref(false);
const boardStore = useBoardStore();

const loading = ref(false);
/*$q.loading.show({
  message: "Se está creando el tablero",
});*/

const CrearIndicador = async () => {
  try {
    const nameindicator = boardStore.NombreIndicador;
    const idboard = boardStore.idTablero;
    const res = await boardStore.createIndicator(nameindicator, idboard);
    boardStore.NombreIndicador = "";
    await boardStore.getIndicator(idboard);

    $q.notify({
      type: "positive",
      message: "Se creó el Indicador con Exito",
    });
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Intente Nuevamente - " + error.error,
    });
  } finally {
    loading.value = false;
  }
};
</script>
