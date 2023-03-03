<template>
  <div></div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { store } from "quasar/wrappers";
import { useBoardStore } from "src/stores/board-store";

import { useQuasar } from "quasar";

const $q = useQuasar();

const storeBoard = useBoardStore();

defineProps({
  ID_Tablero: Number,
  Nombre_Tablero: String,
  Anio: Number,
  Semestre: Number,
  Color: String,
});
</script>

<style lang="scss" scoped>
.card {
  text-decoration: none;
  color: black;
}

.my-card {
  width: 250px;
}

.principal {
  background: url("src/assets/perfil.png");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: auto;
}
</style>
