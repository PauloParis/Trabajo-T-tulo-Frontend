<template>
  <div v-for="(indicator, index) in storeCycle.MisIndicadores" :key="index">
    <div v-if="(indicator.ciclo.ID_Ciclo = idCiclo)">
      <div class="q-pa-sm">
        <!--Pintar de Color-->
        <div class="row items-center">
          <div class="col">
            <q-btn
              outline
              flat
              color="red"
              icon="clear"
              style="height: 20px; width: 30px"
            ></q-btn>
            <Label class="text-body1 text-weight-regular q-pa-sm">{{
              indicator.Nombre_Indicador
            }}</Label>
          </div>
          <div class="col-4 row justify-end">
            <q-btn
              class="q-pr-xs"
              push
              round
              dense
              style="width: 35px; height: 35px"
              ><q-avatar size="35px"> <img src="./faces/sad.png" /> </q-avatar
            ></q-btn>
            <q-btn
              class="q-pr-xs"
              push
              round
              dense
              style="width: 35px; height: 35px"
              ><q-avatar size="35px">
                <img src="./faces/neutral.png" /> </q-avatar
            ></q-btn>
            <q-btn
              class="q-pr-xs"
              push
              round
              dense
              style="width: 35px; height: 35px"
              ><q-avatar size="35px"> <img src="./faces/happy.png" /> </q-avatar
            ></q-btn>
            <q-breadcrumbs-el icon="help" style="width: 12px; height: 35px">
              <q-tooltip
                class="bg-purple text-body2 column"
                transition-show="flip-right"
                anchor="center right"
                self="center left"
                ><div class="col">Usuario 1</div>
                <div class="col">Usuario 2</div>
              </q-tooltip>
            </q-breadcrumbs-el>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBoardStore } from "src/stores/board-store";
import socket from "src/stores/socket-store";

const storeCycle = useBoardStore();

defineProps({
  idCiclo: Number,
});
</script>
