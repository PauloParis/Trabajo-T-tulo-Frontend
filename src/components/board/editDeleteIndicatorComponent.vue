<template>
  <div class="q-pa-md">
    <q-dialog v-model="boardStore.openDialogEditDelete">
      <q-card style="width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Editar o Eliminar Indicador</div>

          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator inset></q-separator>
        <q-form
          class="q-pa-md row items-center"
          @submit.prevent="editarIndicador"
        >
          <div class="col-10">
            <!-- input con el nomnbre del indicador -->
            <q-input
              v-model="boardStore.infoIndicador.NombreIndicador"
              label="Nombre"
              placeholder="Ingrese Nombre"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Porfavor Escriba un Nombre',
              ]"
            />
          </div>
          <!-- btn para eliminar indicador -->
          <div class="col-2 text-center">
            <q-btn
              class="bg-red"
              glossy
              style="height: 30px; width: 40px"
              icon="delete"
              color="white"
              @click="
                (boardStore.openDialogDelete = true),
                  (boardStore.TituloDelete = 'Indicador')
              "
            ></q-btn>
          </div>

          <br />
          <q-card-actions class="text-primary" style="width: 100%">
            <q-btn
              style="width: 100%"
              outline
              label="Guardar Cambios"
              type="submit"
              v-close-popup
            />
          </q-card-actions>
        </q-form>
      </q-card>

      <deleteComponent></deleteComponent>
    </q-dialog>
  </div>
</template>

<script setup>
import { useBoardStore } from "src/stores/board-store";
import deleteComponent from "src/components/board/deleteComponent.vue";
import { useNotify } from "src/composables/notifyHook";
import { useQuasar } from "quasar";

const boardStore = useBoardStore();
const { successNotify, errorNotify } = useNotify();
const $q = useQuasar();

const editarIndicador = async () => {
  try {
    $q.loading.show();
    await boardStore.editIndicator();
    await boardStore.getIndicator(boardStore.infoTablero.IdTablero);
    successNotify("El datos del indicador fueron actualizados correctamente");
  } catch (error) {
    errorNotify(error);
  } finally {
    $q.loading.hide();
  }
};
</script>
