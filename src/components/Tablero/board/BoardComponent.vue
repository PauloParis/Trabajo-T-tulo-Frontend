<template>
  <div>
    <q-card
      flat
      bordered
      class="my-card"
      v-bind:style="{ background: board.Color }"
    >
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">{{ Nombre_Tablero }}</div>
            <div class="text-subtitle2 text-blue-grey-14">Año: {{ Anio }}</div>
            <div class="text-subtitle2 text-blue-grey-14">
              Semestre: {{ Semestre }} - {{ Color }}
            </div>
          </div>

          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="more_vert">
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable>
                    <q-item-section class="text-secondary"
                      ><q-btn flat> Editar Tablero</q-btn>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section class="text-negative">
                      <q-btn flat>Eliminar Tablero</q-btn>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="center">
        <q-btn flat>
          <!--router-link
            class="card"
            :to="{ name: 'board', params: { id_tablero, Nombre_Tablero } }"
            >Abrir
          </router-link--></q-btn
        >
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { useBoardStore } from "src/stores/board-store";

const storeBoard = useBoardStore();
/*
var tarjeta = document.getElementById("board");
var verde = storeBoard.color;

document.addEventListener("DOMContentLoaded", function () {
  tarjeta.style.setProperty("--verde", verde);
});*/

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
</style>
