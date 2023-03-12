<template>
  <div class="">
    <q-dialog v-model="boardStore.openDialogEditCycle" persistent>
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6">Editar Ciclo</div>
          <q-separator></q-separator>
        </q-card-section>

        <q-form class="q-pa-md" @submit.prevent="editarCiclo">
          <q-input
            v-model="boardStore.infoCiclo.NombreCiclo"
            label="Nombre"
            placeholder="Ingrese Nombre"
            :rules="[
              (val) => (val && val.length > 0) || 'Porfavor Escriba un Nombre',
            ]"
          />

          <br />
          <q-card-actions align="right" class="text-primary">
            <q-btn
              flat
              label="Cancelar"
              @click="boardStore.infoCiclo.NombreCiclo = ''"
              class="text-negative"
              v-close-popup
            />
            <q-btn flat label="Guardar" type="submit" v-close-popup />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useBoardStore } from "src/stores/board-store";
import { useNotify } from "src/composables/notifyHook";
import { useQuasar } from "quasar";

const boardStore = useBoardStore();
const { successNotify, errorNotify } = useNotify();
const $q = useQuasar();

const editarCiclo = async () => {
  try {
    $q.loading.show();
    await boardStore.editCycle();
    successNotify("El datos del ciclo fueron actualizados correctamente");
  } catch (error) {
    errorNotify(error);
  } finally {
    $q.loading.hide();
  }
};
</script>
