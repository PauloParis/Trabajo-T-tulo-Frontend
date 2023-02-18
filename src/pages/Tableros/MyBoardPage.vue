<template>
  <q-page padding class="principal">
    <div class="q-pa-xs col-12">
      <label class="text-h4 text-blue-grey-14 text-weight-medium"
        >Mis Tableros
      </label>
    </div>
    <q-separator></q-separator>
    <br />
    <div class="row items-center">
      <div class="col-4">
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
        <q-input v-model="search" placeholder="Buscar" disable></q-input>
      </div>
    </div>

    <br />
    <br />

    <div class="row q-gutter-xl">
      <div v-for="(board, index) in boardStore.MisTableros" :key="index">
        <q-card
          flat
          bordered
          class="my-card"
          :style="{
            background: `linear-gradient(to left top, ${board.Color},white)`,
          }"
        >
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6 text-grey-9">
                  {{ board.Nombre_Tablero }}
                </div>
                <div class="text-subtitle2 text-black">
                  Año: {{ board.Anio }}
                </div>
                <div class="text-subtitle2 text-black">
                  Semestre: {{ board.Semestre }}
                </div>
              </div>

              <div class="col-auto">
                <q-btn color="grey-7" round flat icon="more_vert">
                  <q-menu cover auto-close>
                    <q-list>
                      <q-item clickable>
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

                      <q-item clickable>
                        <q-item-section class="text-negative">
                          <q-btn
                            flat
                            @click="
                              (boardStore.btndelete = true),
                                (boardStore.idTablero = board.ID_Tablero)
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

          <q-card-actions align="center">
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
                class="btn-fixed"
                flat
                label="Abrir"
                @click="
                  (boardStore.NombreTablero = board.Nombre_Tablero), oldpage()
                "
              ></q-btn>
            </router-link>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <editBoard></editBoard>
    <deleteBoard></deleteBoard>
  </q-page>
</template>

<script setup>
import createBoard from "src/components/board/createBoardComponent.vue";
import editBoard from "src/components/board/editBoardComponent.vue";
import deleteBoard from "src/components/board/deleteBoardComponent.vue";

import { useBoardStore } from "src/stores/board-store";
import { useAccessStore } from "src/stores/access-store";
import { ref } from "@vue/reactivity";

const boardStore = useBoardStore();
const accessStore = useAccessStore();
boardStore.getMyBoard();
accessStore.getInfoUser();

const search = ref("Buscar");

const oldpage = async () => {
  boardStore.oldURL = window.location.href;
  document.cookie = `board = ${boardStore.NombreTablero}`;
};
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
  background-size: cover;
}
.btn-fixed {
  width: 240px;
}
</style>
