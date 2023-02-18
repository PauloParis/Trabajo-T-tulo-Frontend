<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="boardStore.btncreate" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Eliminar Cuenta</div>
          <q-separator></q-separator>
        </q-card-section>

        <br />

        <br />

        <br />
        <q-card-actions align="right" class="text-primary">
          <br />
          <q-btn flat label="Cancelar" class="text-negative" v-close-popup />
          <q-btn flat label="Guardar" @click="EliminarCuenta" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useUserStore } from "src/stores/user-store";
import { useQuasar } from "quasar";

//NO SE ESTÁ USANDO ELIMINAR
////////////////////////////7
///////////////////////////////
//////////////////////////////7
//////////////////////////////77
///////////////////////////////777
///////////////////////////
const $q = useQuasar();
const promt = ref(false);
const userStore = useUserStore();

const EliminarCuenta = async () => {
  try {
    console.log("paso las validaciones para crear Tablero");
    const res = await userStore.deleteUser();
    $q.notify({
      type: "positive",
      message: "Se Elimino la Cuenta con Exito",
    });

    console.log(res);
  } catch (error) {
    $q.notify({
      type: "negative",
      message: error.error,
    });
  }
};
</script>
