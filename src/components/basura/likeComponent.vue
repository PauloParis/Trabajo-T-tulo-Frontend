<template>
  <div>
    <q-btn icon="cancel" size="xs" round @click="mensaje">
      <q-tooltip
        class="bg-purple text-body2 column"
        transition-show="flip-right"
        anchor="center right"
        self="center left"
        ><div class="col">Eliminar Evaluación</div>
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useBoardStore } from "src/stores/board-store";
import { useRoute } from "vue-router";
const boardStore = useBoardStore();
const route = useRoute();
const $q = useQuasar();
const props = defineProps({
  idindicador: Number,
  idBoard: Number,
});

const mensaje = async () => {
  try {
    const id = props.idindicador;
    const idtablero = route.params.idBoard;

    const res = await boardStore.deleteEvaluation(id);
    const res2 = await boardStore.happyIndicator(id);
    const res3 = await boardStore.happyUser(idtablero);

    if ((boardStore.notificacion = "ok")) {
      $q.notify({
        type: "positive",
        message: "Se Eliminó la evaluación Correctamente",
      });
    } else {
      $q.notify({
        type: "negative",
        message: error.response.data.error,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
