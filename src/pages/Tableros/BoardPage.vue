<template>
  <q-layout view="lHh lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- Volver a la pagina anterior -->
        <q-btn
          flat
          round
          dense
          icon="arrow_back"
          color="light-blue-9"
          class="q-mr-sm bg-white"
          @click="desconect(), $router.go(-1)"
        />

        <!-- Usuarios Conectados -->
        <q-toolbar-title>
          <div class="row items-center">
            <!--div class="col-4">Índice de Felicidad</div-->
            <div class="col-4"></div>
            <div v-for="(user, index) in boardStore.usuarios" :key="index">
              <div class="row q-pa-xs text-overline">
                <q-btn
                  :class="`col ${color[index]}`"
                  flat
                  round
                  dense
                  style="width: 40px; height: 40px"
                  @click="
                    (adminStore.btnOpenUserInfo = true),
                      (adminStore.usuarioInfo.name =
                        user.infoUser[0].Nombre_Usuario),
                      (adminStore.usuarioInfo.surname =
                        user.infoUser[0].Apellido),
                      (adminStore.usuarioInfo.email = user.infoUser[0].Email),
                      (adminStore.usuarioInfo.country = user.infoUser[0].Pais),
                      (adminStore.usuarioInfo.type =
                        user.infoUser[0].Tipo_Usuario),
                      (adminStore.usuarioInfo.category =
                        user.infoUser[0].usuario_tableros[0].Categoria),
                      (adminStore.usuarioInfo.description =
                        user.infoUser[0].Descripcion)
                  "
                >
                  <q-tooltip class="bg-purple text-body2 column"
                    ><div class="col">
                      {{ user.infoUser[0].Nombre_Usuario }}
                      {{ user.infoUser[0].Apellido }}
                    </div>
                  </q-tooltip>
                  {{ user.infoUser[0].Nombre_Usuario[0] }}
                  {{ user.infoUser[0].Apellido[0] }}
                </q-btn>
                <getInfoUserComponent></getInfoUserComponent>
              </div>
            </div>
          </div>
        </q-toolbar-title>
        <!-- Invitar Usuario -->
        <q-btn
          flat
          round
          dense
          icon="add_reaction"
          size="lg"
          @click="boardStore.openDialogInvite = true"
        ></q-btn>
        <label>Invitar Usuario</label>
      </q-toolbar></q-header
    >

    <q-page-container>
      <q-page padding class="principal">
        <br />

        <!-- Nombre del Tablero & Felicidad del Tablero -->
        <div class="row q-mb-sm items-center">
          <div
            class="col-12 col-sm-6 text-h4 text-weight-bold text-blue-grey-10"
          >
            {{ $route.params.nameBoard }}
          </div>
          <!-- Felicidad del Tablero -->
          <div class="col-12 col-sm-6">
            <div class="row items-center">
              <div class="text-h6 text-weight-bold text-blue-grey-14">
                Felicidad del Tablero:
              </div>
              <div class="q-pl-md text-h5 text-weight-bolder text-accent">
                {{ boardStore.felicidadTablero }} %
              </div>
            </div>
          </div>
        </div>
        <q-separator></q-separator>
        <br />

        <!-- btn Crear Ciclo & btn Crear Indicador & btn Editar Indicador & Indicadores -->
        <div class="row items-center">
          <div class="col-12 col-md-4 col-sm-6 q-mt-sm">
            <!-- btn Crear Ciclo -->
            <q-btn
              class="q-mr-md"
              rounded
              label="Crear Ciclo"
              color="primary"
              size="lg"
              @click="
                (boardStore.openDialogCreate = true),
                  (boardStore.Titulo = 'Ciclo')
              "
            ></q-btn>
            <!-- btn Crear Indicador -->
            <q-btn
              class="q-mr-sm q-mt-sm"
              rounded
              label="Crear Indicadores"
              color="secondary"
              size="md"
              @click="
                (boardStore.openDialogCreate = true),
                  (boardStore.Titulo = 'Indicador')
              "
            >
              <q-tooltip class="bg-purple text-body2 column"
                ><div class="">
                  Los Indicadores Aparecerán en todos los Ciclos Creados
                </div>
              </q-tooltip>
            </q-btn>
          </div>
          <!-- Indicadores -->
          <div class="col-12 col-md-8 col-sm-6 q-mt-sm">
            <div
              class="espacio-ocupa q-mr-sm q-pa-xs q-mt-sm bordes shadow-10 efecto-indicadores"
              v-for="(indicator, index) in boardStore.MisIndicadores"
              :key="index"
            >
              <div
                @click="
                  (boardStore.openDialogEditDelete = true),
                    (boardStore.infoTablero.IdTablero =
                      indicator.tableroIDTablero),
                    (boardStore.infoIndicador.IdIndicador =
                      indicator.ID_Indicador),
                    (boardStore.infoIndicador.NombreIndicador =
                      indicator.Nombre_Indicador)
                "
              >
                {{ indicator.Nombre_Indicador }}
              </div>
            </div>
          </div>

          <createComponent></createComponent>
          <editDeleteIndicatorComponent></editDeleteIndicatorComponent>
        </div>
        <br />

        <!-- for card -->
        <div class="row items-center centrar-card">
          <div
            class=""
            v-for="(cycle, index) in boardStore.MisCiclos"
            :key="index"
          >
            <!-- Card Ciclos -->
            <q-card class="my-card bordes q-ma-sm" flat bordered>
              <!-- Nombre del Ciclo & Editar & Eliminar -->
              <q-card-section class="row items-center">
                <!-- Nombre del Ciclo -->
                <div class="text-body1 text-weight-bold col-md-8">
                  {{ cycle.Nombre_Ciclo }}
                </div>
                <div class="col row justify-end">
                  <!-- btn Editar -->
                  <q-btn
                    class="bg-blue glossy"
                    style="height: 30px; width: 40px"
                    icon="edit"
                    color="white"
                    @click="
                      (boardStore.openDialogEditCycle = true),
                        (boardStore.infoCiclo.NombreCiclo = cycle.Nombre_Ciclo),
                        (boardStore.infoCiclo.IdCiclo = cycle.ID_Ciclo)
                    "
                  ></q-btn>
                  <!-- btn Eliminar -->
                  <q-btn
                    class="bg-red q-ml-sm"
                    glossy
                    style="height: 30px; width: 40px"
                    icon="delete"
                    color="white"
                    @click="
                      (boardStore.openDialogDelete = true),
                        (boardStore.infoCiclo.IdCiclo = cycle.ID_Ciclo),
                        (boardStore.TituloDelete = 'Ciclo')
                    "
                  ></q-btn>
                </div>
              </q-card-section>
              <q-separator inset></q-separator>

              <!-- Indicadores -->
              <q-scroll-area
                :thumb-style="thumbStyle"
                :bar-style="barStyle"
                style="height: 200px"
                ><q-card-section>
                  <div
                    v-for="(indicator, item) in boardStore.MisIndicadores"
                    :key="item"
                  >
                    <div class="row items-center">
                      <!-- Nombre Indicador -->
                      <div class="col-6 text-blue-grey-10 text-body1">
                        {{ indicator.Nombre_Indicador }}
                      </div>
                      <!-- Evaluación -->
                      <div class="col-6">
                        <div
                          v-for="(elemt, i) in indicator.evaluaciones"
                          :key="i"
                          class="q-mb-sm q-mt-sm"
                        >
                          <div
                            class="row items-center"
                            v-if="cycle.ID_Ciclo == elemt.cicloIDCiclo"
                          >
                            <div class="col q-mr-sm">
                              <div
                                :class="{
                                  'cabeza-triste': elemt.Evaluacion == -1,
                                  'cabeza-normal': elemt.Evaluacion == 0,
                                  'cabeza-feliz': elemt.Evaluacion == 1,
                                }"
                              >
                                <div
                                  :class="{
                                    'ojo-izq': elemt.Evaluacion != null,
                                  }"
                                ></div>

                                <div
                                  :class="{
                                    'ojo-der': elemt.Evaluacion != null,
                                  }"
                                ></div>

                                <div
                                  :class="{
                                    'boca-triste': elemt.Evaluacion == -1,
                                    'boca-normal': elemt.Evaluacion == 0,
                                    'boca-feliz': elemt.Evaluacion == 1,
                                  }"
                                ></div>
                              </div>
                            </div>
                            <!-- Realizar Evaluación -->
                            <div class="col-6 q-ml-lg">
                              <!-- indicator.usuario_indicadors[index].Evaluacion -->
                              <q-slider
                                v-model="elemt.Evaluacion"
                                color="light-blue-14"
                                markers
                                snap
                                :min="-1"
                                :max="1"
                                @change="
                                  evaluar(
                                    elemt.ID_Evaluacion,
                                    elemt.Evaluacion,
                                    indicator.ID_Indicador,
                                    elemt.cicloIDCiclo
                                  )
                                "
                              />
                            </div>
                            <!-- Eliminar Evaluación -->
                            <div class="col q-ml-md">
                              <q-btn
                                @click="
                                  eliminarEvaluacion(
                                    elemt.ID_Evaluacion,
                                    indicator.ID_Indicador,
                                    elemt.cicloIDCiclo
                                  )
                                "
                                class="no-padding"
                                icon="close"
                                color="red"
                                round
                                size="xs"
                                ><q-tooltip class="bg-purple text-body2 column"
                                  ><div class="">Eliminar Evaluación</div>
                                </q-tooltip></q-btn
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <q-separator></q-separator>
                  </div>
                </q-card-section>
              </q-scroll-area>

              <q-separator inset></q-separator>

              <!-- Felicidad del Ciclo -->
              <q-card-section class="row items-center">
                <div class="text-body1 text-cyan-10 text-weight-bold">
                  Felicidad del Ciclo:
                </div>
                <div class="q-pl-md text-h6 text-cyan-10">
                  {{ cycle.Felicidad_Ciclo }} %
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <invitationUser></invitationUser>
        <editCycle></editCycle>
        <deleteComponent></deleteComponent>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import createComponent from "src/components/board/createComponent.vue";
import editCycle from "src/components/board/editCycleComponent.vue";
import deleteComponent from "src/components/board/deleteComponent.vue";
import editDeleteIndicatorComponent from "src/components/board/editDeleteIndicatorComponent.vue";
import invitationUser from "src/components/board/invitationUserComponent.vue";
import getInfoUserComponent from "src/components/board/getInfoUserComponent.vue";
import { useBoardStore } from "src/stores/board-store";
import { useAdminStore } from "src/stores/admin-store";
import { useNotify } from "src/composables/notifyHook";
import { onMounted } from "vue";
import socket from "src/stores/socket-store";
import { useQuasar } from "quasar";

const boardStore = useBoardStore();
const adminStore = useAdminStore();
const { successNotify, errorNotify } = useNotify();
const $q = useQuasar();

const evaluar = async (id_evaluacion, result, id_indicador, id_ciclo) => {
  try {
    const id = {
      ide: id_evaluacion,
      ide: id_evaluacion,
      eva: result,
      idi: id_indicador,
      idc: id_ciclo,
      idt: localStorage.getItem("keyboard"),
    };

    await boardStore.updateEvaluation(id.ide, id.eva, id.idi, id.idc, id.idt);
    successNotify("Se actualizó la evaluación Correctamente");
  } catch (error) {
    errorNotify("No se pudo actualizar la evaluación en este Indicador");
  }
};

const eliminarEvaluacion = async (idevaluacion, id_indicador, id_ciclo) => {
  try {
    $q.loading.show();
    const id = {
      ide: idevaluacion,
      idt: localStorage.getItem("keyboard"),
      idi: id_indicador,
      idc: id_ciclo,
    };
    await boardStore.deleteEvaluation(id.ide, id.idt, id.idc, id.idi);
    await boardStore.getIndicator(id.idt);
    successNotify("Se Eliminó la evaluación Correctamente");
  } catch (error) {
    errorNotify("No se pudo Eliminar la evaluación en este Indicador");
  } finally {
    $q.loading.hide();
  }
};

boardStore.getCycles(localStorage.getItem("keyboard"));
boardStore.getIndicator(localStorage.getItem("keyboard"));
boardStore.getInfoUserSocket(localStorage.getItem("keyboard"));

//accessStore.getInfoUser(); //------------------------------------------------------------------------

const room = localStorage.getItem("board");
const idUser = localStorage.getItem("keyuser");
boardStore.felicidadTablero = localStorage.getItem("happyboard");

/* -------------------- SOCKET ------------------- */

// unir al usuario al room especifico
onMounted(async () => {
  const infoUser = await boardStore.getInfoUserSocket(
    localStorage.getItem("keyboard")
  );
  socket.emit("joinRoom", { idUser, room, infoUser });
});

// desconectar si sale de la page
const desconect = () => {
  socket.disconnect();
  localStorage.removeItem("keyuser");
  localStorage.removeItem("happyboard");
  localStorage.removeItem("board");
  localStorage.removeItem("keyboard");
};

window.onpopstate = function () {
  socket.disconnect();
  localStorage.removeItem("keyuser");
  localStorage.removeItem("happyboard");
  localStorage.removeItem("board");
  localStorage.removeItem("keyboard");
};

// obtener usuarios y room ----------------------------------------------------------------------
socket.on("roomUsers", ({ room, users }) => {
  boardStore.usuarios = users;
});

// crear ciclo
socket.on("crearCiclo", (ciclo) => {
  boardStore.getCycles(localStorage.getItem("keyboard"));
  boardStore.getIndicator(localStorage.getItem("keyboard"));
});

// editar ciclo
socket.on("editarCiclo", (ciclo) => {
  boardStore.MisCiclos = boardStore.MisCiclos.map((item) =>
    item.ID_Ciclo === ciclo.ID_Ciclo ? ciclo : item
  );
});

// eliminar ciclo
socket.on("eliminarCiclo", (ciclo) => {
  boardStore.MisCiclos = ciclo;
});

// crear indicador
socket.on("crearIndicador", (indicador) => {
  boardStore.getIndicator(localStorage.getItem("keyboard"));
});

// editar indicador
socket.on("editarIndicador", (indicador) => {
  boardStore.MisIndicadores = boardStore.MisIndicadores.map((item) =>
    item.ID_Indicador === indicador.ID_Indicador ? indicador : item
  );
});

// eliminar indicador
socket.on("eliminarIndicador", (indicador) => {
  boardStore.MisIndicadores = indicador;
});

// felicidad del tablero
socket.on("felicidadTablero", (felicidadTablero) => {
  localStorage.setItem("happyboard", felicidadTablero);
  boardStore.felicidadTablero = localStorage.getItem("happyboard");
});

// felicidad de los ciclos
socket.on("felicidadCiclo", (felicidadCiclo) => {
  boardStore.getCycles(localStorage.getItem("keyboard"));
});

/* const color = [
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
]; */
const color = ["bg-blue-grey-10", "bg-blue-grey-9", "bg-blue-grey-8"];

const thumbStyle = {
  right: "4px",
  borderRadius: "3px",
  backgroundColor: "#027be3",
  width: "3px",
  opacity: 0.75,
};

const barStyle = {
  right: "2px",
  borderRadius: "9px",
  backgroundColor: "#027be3",
  width: "5px",
  opacity: 0.2,
};
</script>

<style lang="scss" scoped>
.efecto-indicadores:hover {
  cursor: pointer;
  background-color: $blue-grey-2;
}
.efecto-indicadores {
  background-color: white;
}

.principal {
  background: url("src/assets/fondos/fondo5.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}

@media only screen and (max-width: 1146px) {
  .centrar-card {
    justify-content: center;
  }
}

.my-card {
  width: 350px;
  background: rgba(235, 236, 240, 0.9);
  border: 1px solid;
  border-radius: 10px;
  color: $blue-grey-14;
}

.imagesad {
  background: url("src/assets/faces/sad.png");
}

.espacio-ocupa {
  display: inline-block;
}

.bordes {
  border: 1px solid;
  border-radius: 10px;
  color: $blue-grey-14;
}

/* ----------------------------------------------------- */

.cabeza-triste {
  --face-hue1: 0; /* normal 60 */ /* feliz 120 */ /* triste 0 */
  --face-hue2: 330; /* normal 30 */ /* feliz 90 */ /* triste  330*/
  background-image: linear-gradient(
    135deg,
    hsl(var(--face-hue1), 90%, 55%),
    hsl(var(--face-hue2), 90%, 45%)
  );
  border-radius: 50%;
  box-shadow: 0 0.5em 0.75em hsla(var(--face-hue2), 90%, 55%, 0.3);
  margin: 0 auto;
  position: relative;
  width: 2.5em;
  height: 2.5em;
}
.cabeza-normal {
  --face-hue1: 60; /* normal 60 */ /* feliz 120 */ /* triste 0 */
  --face-hue2: 30; /* normal 30 */ /* feliz 90 */ /* triste  330*/
  background-image: linear-gradient(
    135deg,
    hsl(var(--face-hue1), 90%, 55%),
    hsl(var(--face-hue2), 90%, 45%)
  );
  border-radius: 50%;
  box-shadow: 0 0.5em 0.75em hsla(var(--face-hue2), 90%, 55%, 0.3);
  margin: 0 auto;
  position: relative;
  width: 2.5em;
  height: 2.5em;
}
.cabeza-feliz {
  --face-hue1: 120; /* normal 60 */ /* feliz 120 */ /* triste 0 */
  --face-hue2: 90; /* normal 30 */ /* feliz 90 */ /* triste  330*/
  background-image: linear-gradient(
    135deg,
    hsl(var(--face-hue1), 90%, 55%),
    hsl(var(--face-hue2), 90%, 45%)
  );
  border-radius: 50%;
  box-shadow: 0 0.5em 0.75em hsla(var(--face-hue2), 90%, 55%, 0.3);
  margin: 0 auto;
  position: relative;
  width: 2.5em;
  height: 2.5em;
}

.ojo-izq {
  background-color: black;
  left: 0.6em;
  border-radius: 50%;
  top: 0.75em;
  width: 0.5em;
  height: 0.5em;
  position: absolute;
}
.ojo-der {
  background-color: black;
  right: 0.6em;
  border-radius: 50%;
  top: 0.75em;
  width: 0.5em;
  height: 0.5em;
  position: absolute;
}
.boca-normal {
  color: black;
  /* border-radius: 50% 50% 0 0 / 100% 100% 0 0; */
  box-shadow: 0 0.125em 0 inset;
  top: 1.75em;
  left: 0.5em;
  width: 1.5em;
  height: 0.7em;
  position: absolute;
}
.boca-feliz {
  color: black;
  border-radius: 0 0 50% 50% / 0 0 100% 100%;
  box-shadow: 0 -0.8em 0 inset;

  top: 1.7em;
  left: 0.6em;
  width: 1.3em;
  height: 0.5em;
  position: absolute;
}

.boca-triste {
  color: black;
  top: 1.6em;
  left: 0.5em;
  width: 1.5em;
  height: 0.4em;
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
  box-shadow: 0 0.125em 0 inset;
  position: absolute;
}
</style>
