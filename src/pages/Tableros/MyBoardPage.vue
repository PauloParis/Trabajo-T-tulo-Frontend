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
          @click="boardStore.btncreate = true"
        ></q-btn>

        <createBoard />
      </div>
      <div class="col-8 q-ml-md" style="width: 50%">
        <!-- Buscador -->
        <q-input v-model="search" placeholder="Buscar" disable></q-input>
      </div>
    </div>

    <br />
    <br />

    <!-- Card -->
    <div class="row items-center centrar-card">
      <div v-for="(board, index) in boardStore.MisTableros" :key="index">
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
                              (boardStore.btnedit = true),
                                (boardStore.NombreTablero =
                                  board.Nombre_Tablero),
                                (boardStore.Semestre = board.Semestre),
                                (boardStore.Anio = board.Anio),
                                (boardStore.Color = board.Color),
                                (boardStore.idTablero = board.ID_Tablero)
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
                                (boardStore.idTablero = board.ID_Tablero),
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
                  idBoard: board.ID_Tablero,
                  nameBoard: board.Nombre_Tablero,
                  happyBoard: board.Felicidad_Tablero,
                  idName: board.usuario_tableros[0].usuario.ID_Usuario,
                  nameUser: board.usuario_tableros[0].usuario.Nombre_Usuario,
                  surnameUser: board.usuario_tableros[0].usuario.Apellido,
                  typeUser: board.usuario_tableros[0].usuario.Tipo_Usuario,
                  userCategory: board.usuario_tableros[0].Categoria,
                },
              }"
              ><q-btn
                class="my-card"
                style="height: 40px"
                flat
                label="Abrir"
                @click="
                  (boardStore.NombreTablero = board.Nombre_Tablero),
                    (boardStore.idTablero = board.ID_Tablero),
                    (boardStore.felicidadTablero = board.Felicidad_Tablero),
                    oldpage()
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

const boardStore = useBoardStore();
const accessStore = useAccessStore();
boardStore.getMyBoard();
accessStore.getInfoUser();

const search = ref("Buscar");

//ARREGLAR
const oldpage = async () => {
  boardStore.oldURL = window.location.href;
  localStorage.setItem("keyboard", boardStore.idTablero);
  localStorage.setItem("happyboard", boardStore.felicidadTablero);
  localStorage.setItem("board", boardStore.NombreTablero);
};
</script>

<style lang="scss" scoped>
.card {
  text-decoration: none;
  color: black;
}
.my-card {
  width: 262px;
}
.principal {
  background: url("src/assets/perfil.png");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}
.btn-fixed {
  width: 240px;
}

.bordes {
  border: 1px solid;
  border-radius: 10px;
  color: $blue-grey-14;
}

@media only screen and (max-width: 1207px) {
  .centrar-card {
    justify-content: center;
  }
}
</style>
