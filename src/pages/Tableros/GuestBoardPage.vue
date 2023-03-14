<template>
  <q-page padding class="principal">
    <div class="q-pa-xs col-12">
      <!-- título page -->
      <label class="text-h4 text-blue-grey-14 text-weight-medium"
        >Tableros Donde Soy Invitado
      </label>
    </div>
    <q-separator></q-separator>
    <br />

    <div class="row">
      <!-- Buscador -->
      <q-input
        class="col-8 col-md-4 q-ml-md float-right"
        v-model="search"
        placeholder="Buscar"
      >
      </q-input>
    </div>

    <br />
    <br />

    <!-- Card -->
    <div class="row centrar-card">
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

              <div class="col-auto">
                <!-- Opciones Desvincularse -->
                <q-btn color="grey-7" round flat icon="more_vert">
                  <q-menu cover auto-close>
                    <q-list>
                      <q-item clickable class="no-padding">
                        <q-item-section class="text-primary"
                          ><q-btn
                            flat
                            @click="
                              (boardStore.openDialogDisassociate = true),
                                (boardStore.infoTablero.IdTablero =
                                  board.ID_Tablero)
                            "
                          >
                            Desvincularse del Tablero</q-btn
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
                label="Abrir"
                flat
                style="width: 262px"
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
    <disassociateBoard></disassociateBoard>
  </q-page>
</template>

<script setup>
import disassociateBoard from "src/components/board/disassociateBoardComponent.vue";
import { useBoardStore } from "src/stores/board-store";
import { useAccessStore } from "src/stores/access-store";
import { ref } from "vue";
import socket from "src/stores/socket-store";

const boardStore = useBoardStore();
const accessStore = useAccessStore();

boardStore.getguestBoards();
accessStore.getInfoUser();

const search = ref("");

//ARREGLAR
const Abrir = () => {
  localStorage.setItem("keyboard", boardStore.infoTablero.IdTablero);
  localStorage.setItem("happyboard", boardStore.felicidadTablero);
  localStorage.setItem("board", boardStore.infoTablero.NombreTablero);
  localStorage.setItem("keyuser", accessStore.infoUsuario.idUsuario);

  socket.connect();
};

function tableros() {
  return boardStore.TablerosInvitado.filter((board) =>
    board.Nombre_Tablero.toLowerCase().includes(search.value.toLowerCase())
  );
}
</script>
