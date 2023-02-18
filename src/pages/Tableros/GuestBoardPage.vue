<template>
  <q-page padding class="principal">
    <div class="q-pa-xs col-12">
      <label class="text-h4 text-blue-grey-14 text-weight-medium"
        >Tableros Donde Soy Invitado
      </label>
    </div>
    <q-separator></q-separator>

    <br />

    <div class="q-gutter-md row">
      <q-input
        class="col-5 float-right"
        v-model="search"
        disable
        placeholder="Buscar"
      >
      </q-input>
    </div>
    <br />
    <br />
    <div class="row q-gutter-xl">
      <div v-for="(board, index) in boardStore.TablerosInvitado" :key="index">
        <div>
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
                          <q-item-section class="text-primary"
                            ><q-btn
                              flat
                              @click="
                                (boardStore.btndisassociate = true),
                                  (boardStore.idTablero = board.ID_Tablero)
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
                  label="Abrir"
                  flat
                  style="width: 250px"
                  @click="
                    (boardStore.NombreTablero = board.Nombre_Tablero), oldpage()
                  "
                ></q-btn>
              </router-link>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
    <disassociateBoard></disassociateBoard>
  </q-page>
</template>

<script setup>
import disassociateBoard from "src/components/board/disassociateBoardComponent.vue";
import { useBoardStore } from "src/stores/board-store";
import { useAccessStore } from "src/stores/access-store";
import { ref } from "@vue/reactivity";

const boardStore = useBoardStore();
const accessStore = useAccessStore();

boardStore.getguestBoards();
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
</style>
