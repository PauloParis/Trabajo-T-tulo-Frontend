<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="boardStore.btnviewindicator">
      <q-card style="width: 700px; height: 500px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Indicadores</div>

          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="text-body1 text-weight-medium">
            {{ boardStore.NombreCiclo }}
          </div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="row items-center">
          <q-btn
            class="col-12 bg-amber-10 glossy"
            color="white"
            style="height: 40px"
            @click="boardStore.btnindicatorcreate = true"
          >
            Agregar Indicador
          </q-btn>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section>
          <div>
            <div
              v-for="(indicator, index) in boardStore.MisIndicadores"
              :key="index"
            >
              <div class="q-pa-sm">
                <div class="row items-center">
                  <div class="col-1">
                    <label class="text-body1">{{ index + 1 }} )</label>
                  </div>
                  <div class="col-7">
                    <q-btn
                      outline
                      flat
                      color="red"
                      icon="clear"
                      style="height: 20px; width: 30px"
                      @click="
                        (boardStore.btndeleteindicator = true),
                          (boardStore.idIndicador = indicator.ID_Indicador)
                      "
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
                      @click="evaluar(-1, indicator.ID_Indicador), estado"
                      ><q-avatar size="35px">
                        <img src="./faces/sad.png" /> </q-avatar
                    ></q-btn>
                    <q-btn
                      class="q-pr-xs"
                      push
                      round
                      dense
                      style="width: 35px; height: 35px"
                      @click="evaluar(0, indicator.ID_Indicador)"
                      ><q-avatar size="35px">
                        <img src="./faces/neutral.png" /> </q-avatar
                    ></q-btn>
                    <q-btn
                      class="q-pr-xs bg-green"
                      push
                      round
                      dense
                      style="width: 35px; height: 35px"
                      @click="evaluar(1, indicator.ID_Indicador)"
                      ><q-avatar size="35px">
                        <img src="./faces/happy.png" /> </q-avatar
                    ></q-btn>
                    <like :idindicador="indicator.ID_Indicador"></like>
                  </div>
                </div>
                <br />
                <q-separator></q-separator>
              </div>
            </div>
          </div>
        </q-card-section>
        <label>{{ evaluation }} {{ idd }}</label>
      </q-card>
      <createIndicator></createIndicator>
      <deleteIndicator></deleteIndicator>
    </q-dialog>
  </div>
</template>

<script setup>
import { useBoardStore } from "src/stores/board-store";
import createIndicator from "src/components/board/createIndicatorComponent.vue";
import deleteIndicator from "src/components/board/deleteIndicatorComponent.vue";
import like from "src/components/board/likeComponent.vue";

import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
import { ref } from "@vue/reactivity";

import socket from "src/stores/socket-store";

const $q = useQuasar();
const route = useRoute();

const boardStore = useBoardStore();

const props = defineProps({
  idBoard: Number,
  nameBoard: String,
  happyBoard: Number,
  idName: Number,
  nameUser: String,
  surnameUser: String,
  typeUser: String,
  userCategory: String,
});

const evaluar = async (result, id) => {
  boardStore.evaluacion = result;
  const idtablero = route.params.idBoard;
  try {
    const eva = boardStore.evaluacion;
    const idd = id;
    const res = await boardStore.saveEvaluation(eva, idd);
    const res2 = await boardStore.happyIndicator(idd);
    const res3 = await boardStore.happyUser(idtablero);

    if (boardStore.notificacion === "ok") {
      $q.notify({
        type: "positive",
        message: "Se realizó la evaluación Correctamente",
      });
    } else {
      $q.notify({
        type: "negative",
        message: "Ya se realizó la evaluación en este Indicador",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

socket.on("indicadores", (msg) => {
  boardStore.MisIndicadores.push(msg);
});
socket.on("eliminarIndicador", (remove) => {
  boardStore.MisIndicadores = remove;
});
</script>
