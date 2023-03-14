<template>
  <q-page padding class="principal">
    <div class="q-pa-xs col-12">
      <!-- título page -->
      <label class="text-h4 text-blue-grey-14 text-weight-medium"
        >Mis Tableros
      </label>
    </div>
    <q-separator></q-separator>
    <br />
    <div class="row">
      <!-- btn Crear Tablero & Buscador -->
      <div class="col-4">
        <!-- btn Crear Tablero -->
        <q-btn
          label="Crear Tablero"
          color="primary"
          size="lg"
          class="text-h6"
          outline
          rounded
          @click="boardStore.openDialogCreate = true"
        ></q-btn>

        <createBoard />
      </div>
      <div class="col-8 q-ml-md" style="width: 50%">
        <!-- Buscador -->
        <q-input v-model="search" placeholder="Buscar"></q-input>
      </div>
    </div>

    <br />
    <br />

    <!-- Card -->
    <div class="row items-center centrar-card">
      <div v-for="(board, index) in tableros()" :key="index">
        <q-card flat bordered class="my-card q-ma-md bordes">
          <!-- Contenido card -->
          <q-card-section
            :style="{
              background: `linear-gradient(to left top, ${board.Color},white)`,
            }"
          >
            <div class="row">
              <div class="col">
                <!-- Título Card -->
                <div
                  class="text-body1 text-weight-regular q-pb-sm text-grey-10"
                >
                  {{ board.Nombre_Tablero }}
                </div>
                <!-- Año y Semestre -->
                <div class="row text-caption">
                  <div class="col-6 text-blue-grey-10">Año:</div>
                  <div class="col-6">{{ board.Anio }}</div>
                  <div class="col-6 text-blue-grey-10">Semestre:</div>
                  <div class="col-6">{{ board.Semestre }}</div>
                </div>
              </div>

              <!-- Opciones Editar y Eliminar -->
              <div class="col-auto">
                <q-btn color="grey-7" round flat icon="more_vert">
                  <q-menu cover auto-close>
                    <q-list>
                      <q-item clickable class="no-padding">
                        <!-- Opción Editar -->
                        <q-item-section class="text-secondary"
                          ><q-btn
                            flat
                            @click="
                              (boardStore.openDialogEditBoard = true),
                                (boardStore.infoTablero.NombreTablero =
                                  board.Nombre_Tablero),
                                (boardStore.infoTablero.Semestre =
                                  board.Semestre),
                                (boardStore.infoTablero.Anio = board.Anio),
                                (boardStore.infoTablero.Color = board.Color),
                                (boardStore.infoTablero.IdTablero =
                                  board.ID_Tablero)
                            "
                          >
                            Editar Tablero
                          </q-btn>
                        </q-item-section>
                      </q-item>

                      <q-item clickable class="no-padding">
                        <!-- Opción Eliminar -->
                        <q-item-section class="text-negative">
                          <q-btn
                            flat
                            @click="
                              (boardStore.openDialogDelete = true),
                                (boardStore.infoTablero.IdTablero =
                                  board.ID_Tablero),
                                (boardStore.TituloDelete = 'Tablero')
                            "
                            >Eliminar Tablero</q-btn
                          >
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <!-- btn Abrir -->
          <q-card-actions class="no-padding">
            <router-link
              class="card"
              :to="{
                name: 'board',
                params: {
                  nameBoard: board.Nombre_Tablero,
                },
              }"
            >
              <q-btn
                class="my-card"
                style="height: 40px"
                flat
                label="Abrir"
                @click="
                  (boardStore.infoTablero.NombreTablero = board.Nombre_Tablero),
                    (boardStore.infoTablero.IdTablero = board.ID_Tablero),
                    (boardStore.felicidadTablero = board.Felicidad_Tablero),
                    Abrir()
                "
              ></q-btn>
            </router-link>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <editBoard></editBoard>
    <deleteComponent></deleteComponent>
  </q-page>
</template>

<script setup>
import createBoard from "src/components/board/createBoardComponent.vue";
import editBoard from "src/components/board/editBoardComponent.vue";
import deleteComponent from "src/components/board/deleteComponent.vue";
import { useBoardStore } from "src/stores/board-store";
import { useAccessStore } from "src/stores/access-store";
import { ref } from "vue";
import socket from "src/stores/socket-store";

const boardStore = useBoardStore();
const accessStore = useAccessStore();
boardStore.getMyBoard();
accessStore.getInfoUser();

const search = ref("");

const Abrir = () => {
  localStorage.setItem("keyboard", boardStore.infoTablero.IdTablero);
  localStorage.setItem("happyboard", boardStore.felicidadTablero);
  localStorage.setItem("board", boardStore.infoTablero.NombreTablero);
  localStorage.setItem("keyuser", accessStore.infoUsuario.idUsuario);
  socket.connect();
};

function tableros() {
  return boardStore.MisTableros.filter((board) =>
    board.Nombre_Tablero.toLowerCase().includes(search.value.toLowerCase())
  );
}
</script>
