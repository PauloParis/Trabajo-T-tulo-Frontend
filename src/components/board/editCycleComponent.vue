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
import { ref } from "@vue/reactivity";
import { useBoardStore } from "src/stores/board-store";
import { useQuasar } from "quasar";

const $q = useQuasar();
const promt = ref(false);
const storeBoard = useBoardStore();

const editarCiclo = async () => {
  try {
    console.log("paso las validaciones para editar el ciclo");
    const data = {
      ID_Ciclo: storeBoard.idCiclo,
      Nombre_Ciclo: storeBoard.NombreCiclo,
    };

    //console.log(data.ID_Ciclo, data.Nombre_Ciclo);
    await storeBoard.editCycle(data);
    $q.notify({
      type: "positive",
      message: "El Datos del ciclo fueron Actualizados Correctamente",
    });
  } catch (error) {
    $q.notify({
      type: "negative",
      message: error.error,
    });
    //console.log("error", error);
  }
};
</script>
