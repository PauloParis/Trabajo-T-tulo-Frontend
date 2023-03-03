<template>
  <div class="">
    <q-dialog v-model="storeBoard.btneditcycle" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Editar Ciclo</div>
          <q-separator></q-separator>
        </q-card-section>

        <q-form class="q-pa-md" @submit.prevent="editarCiclo">
          <q-input
            v-model="storeBoard.NombreCiclo"
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
              @click="storeBoard.NombreCiclo = ''"
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

const { successNotify, errorNotify } = useNotify();
const storeBoard = useBoardStore();

const editarCiclo = async () => {
  try {
    const data = {
      ID_Ciclo: storeBoard.idCiclo,
      Nombre_Ciclo: storeBoard.NombreCiclo,
    };
    await storeBoard.editCycle(data);
    successNotify("El datos del ciclo fueron actualizados correctamente");
  } catch (error) {
    errorNotify(error.error);
  }
};
</script>
