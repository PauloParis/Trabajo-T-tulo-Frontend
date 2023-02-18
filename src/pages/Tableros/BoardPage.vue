<template>
  <q-layout view="lHh lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="arrow_back"
          color="light-blue-9"
          class="q-mr-sm bg-white"
          @click="volver()"
        />

        <q-toolbar-title>
          <div class="row items-center">
            <!--div class="col-4">Índice de Felicidad</div-->
            <div class="col-4"></div>
            <div v-for="(usu, index) in boardStore.usuarios" :key="index">
              <div class="row q-pa-xs">
                <q-btn
                  :class="`col ${color[index]}`"
                  flat
                  round
                  dense
                  size="md"
                  glossy
                  style="width: 40px; height: 40px"
                  @click="
                    (boardStore.name = usu.Nombre_Usuario),
                      (boardStore.surname = usu.Apellido),
                      (boardStore.typeuser = usu.Tipo_Usuario),
                      (boardStore.category = usu.usuario_tableros[0].Categoria),
                      (boardStore.description = usu.Descripcion),
                      (boardStore.btnviewinfouser = true)
                  "
                >
                  <q-tooltip class="bg-purple text-body2 column"
                    ><div class="col">
                      {{ usu.Nombre_Usuario }} {{ usu.Apellido }}
                    </div>
                  </q-tooltip>
                  {{ usu.Nombre_Usuario[0] }}{{ usu.Apellido[0] }}
                </q-btn>
                <getInfoUser></getInfoUser>
              </div>
            </div>
          </div>
        </q-toolbar-title>

        <q-btn
          flat
          round
          dense
          icon="add_reaction"
          size="lg"
          @click="boardStore.btninvitar = true"
        ></q-btn>
        <label>Invitar Usuario</label>
      </q-toolbar></q-header
    >

    <q-page-container>
      <q-page padding class="principal">
        <br />
        <div class="row q-pr-md items-center justify-between">
          <div class="col-5 text-h4 text-weight-medium text-white">
            {{ nameBoard }}
          </div>
          <div class="col-6">
            <div class="row justify-center">
              <q-btn
                push
                class="col-4 bg-teal-10 text-subtitle2"
                color="white"
                label="Calcular Felicidad del grupo :"
                @click="felicidadTablero()"
              >
              </q-btn>
              <div
                class="col-3 q-pl-md text-h4 text-weight-bolder text-green-10"
              >
                {{ boardStore.felicidadTablero }} %
              </div>
            </div>
          </div>
        </div>
        <br />
        <q-separator></q-separator>
        <br />
        <div class="q-gutter-sm">
          <label class="text-h5 text-weight-medium text-blue-grey-9"
            >Crear Ciclo:</label
          >

          <q-btn
            round
            color="primary"
            size="lg"
            icon="playlist_add_circle"
            @click="boardStore.btncyclecreate = true"
          ></q-btn>
          <createCycle :idBoard="idtablero"></createCycle>
        </div>
        <br />
        <br />
        <div class="row q-gutter-xl">
          <div v-for="(cycle, index) in boardStore.MisCiclos" :key="index">
            <q-card class="my-card" flat bordered>
              <q-card-section class="row items-center">
                <div class="text-body1 col-md-8">
                  {{ cycle.Nombre_Ciclo }}
                </div>
                <div class="col row justify-end">
                  <q-btn
                    class="bg-blue glossy"
                    style="height: 30px; width: 40px"
                    icon="edit"
                    color="white"
                    @click="
                      (boardStore.btneditcycle = true),
                        (boardStore.NombreCiclo = cycle.Nombre_Ciclo),
                        (boardStore.idCiclo = cycle.ID_Ciclo)
                    "
                  ></q-btn>
                  <q-btn
                    class="bg-red glossy"
                    style="height: 30px; width: 40px"
                    icon="delete"
                    color="white"
                    @click="
                      (boardStore.btndeletecycle = true),
                        (boardStore.idCiclo = cycle.ID_Ciclo)
                    "
                  ></q-btn>
                </div>
              </q-card-section>
              <q-separator inset></q-separator>

              <q-card-section>
                <div class="row items-center">
                  <q-btn
                    class="col-12 bg-teal-7 glossy"
                    color="white"
                    style="height: 40px"
                    type="submit"
                    @click="
                      (boardStore.btnviewindicator = true),
                        (boardStore.NombreCiclo = cycle.Nombre_Ciclo),
                        (boardStore.idCiclo = cycle.ID_Ciclo),
                        traerindicadores()
                    "
                    >Ver Indicadores</q-btn
                  >
                </div>
              </q-card-section>

              <q-separator inset></q-separator>
              <q-card-section class="row items-center">
                <q-btn
                  class="bg-purple-10 glossy"
                  color="white"
                  @click="
                    (boardStore.NombreCiclo = cycle.Nombre_Ciclo),
                      (boardStore.idCiclo = cycle.ID_Ciclo),
                      felicidadCiclo()
                  "
                  >Felicidad del Ciclo:</q-btn
                >
                <label class="q-pl-md text-h6 text-cyan-10">
                  {{ cycle.Felicidad_Ciclo }} %</label
                >
              </q-card-section>
            </q-card>
          </div>
        </div>
        <invitationUser></invitationUser>
        <editCycle></editCycle>
        <deleteCycle></deleteCycle>
        <viewIndicator></viewIndicator>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
//CRUD CICLOS
import createCycle from "src/components/board/createCycleComponent.vue";
import editCycle from "src/components/board/editCycleComponent.vue";
import deleteCycle from "src/components/board/deleteCycleComponent.vue";
//CREAR Y VER INDICADORES
import viewIndicator from "src/components/board/viewIndicators.vue";
//USUARIO E INVITAR NUEVOS
import invitationUser from "src/components/board/invitationUserComponent.vue";
import getInfoUser from "src/components/board/getInfoUserComponent.vue";

import { useBoardStore } from "src/stores/board-store";
import { useAccessStore } from "src/stores/access-store";

import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
import { ref } from "@vue/reactivity";

import socket from "src/stores/socket-store";

const accessStore = useAccessStore();
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

const route = useRoute();
const idtablero = route.params.idBoard;

//TRAER USUARIO Y CICLOS
boardStore.getCycles(idtablero);
boardStore.getUsers(idtablero);

boardStore.felicidadTablero = route.params.happyBoard;

const traerindicadores = async () => {
  const idciclo = boardStore.idCiclo;
  boardStore.getIndicator(idciclo);
};

const idUser = route.params.idName;
const room = route.params.nameBoard;

socket.emit("joinRoom", { idUser, room });
socket.on("ciclo", (msg) => {
  boardStore.MisCiclos.push(msg);
});
socket.on("editarCiclo", (edit) => {
  boardStore.MisCiclos = boardStore.MisCiclos.map((item) =>
    item.ID_Ciclo === edit.ID_Ciclo ? edit : item
  );
});
socket.on("eliminarCiclo", (remove) => {
  boardStore.MisCiclos = remove;
});
socket.on("felicidadCiclo", (happyciclo) => {
  boardStore.MisCiclos = boardStore.MisCiclos.map((item) =>
    item.ID_Ciclo === happyciclo.ID_Ciclo ? happyciclo : item
  );
});
socket.on("felicidadTablero", (hapytablero) => {
  boardStore.felicidadTablero = hapytablero;
});
socket.on("usuarios", (msg) => {
  boardStore.usuarios.push(msg);
});

const color = [
  "bg-green-10",
  "bg-orange-9",
  "bg-cyan-10",
  "bg-purple-13",
  "bg-lime-14",
  "bg-deep-orange-13",
  "bg-teal-10",
  "bg-indigo-10",
  "bg-pink-13",
  "bg-amber-10",
];

const $q = useQuasar();

const felicidadTablero = async () => {
  try {
    const idboard = route.params.idBoard;
    const res = await boardStore.happyBoard(idboard);
  } catch (error) {
    console.log(error);
  }
};

const felicidadCiclo = async () => {
  try {
    const data = {
      ID_Ciclo: boardStore.idCiclo,
      Nombre_Ciclo: boardStore.NombreCiclo,
    };
    const res = await boardStore.happyCycle(data);
  } catch (error) {
    console.log(error);
  }
};

const volver = async () => {
  document.cookie = "board=; max-age=0";

  if (boardStore.oldURL === "http://localhost:9000/MyBoard") {
    window.location.replace("http://localhost:9000/MyBoard");
  } else {
    if (boardStore.oldURL === "http://localhost:9000/GuestBoard") {
      window.location.replace("http://localhost:9000/GuestBoard");
    }
  }
};
</script>

<style lang="scss" scoped>
.principal {
  background: url("src/assets/fondos/fondo5.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}

.my-card {
  width: 400px;
  background: rgba(235, 236, 240, 1);
}

.imagesad {
  background: url("src/assets/faces/sad.png");
}
</style>
