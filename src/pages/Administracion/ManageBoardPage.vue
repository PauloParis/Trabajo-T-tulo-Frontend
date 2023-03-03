<template>
  <q-page padding class="principal">
    <div class="q-pa-xs">
      <!-- Título Page -->
      <label class="text-h4 text-blue-grey-14 text-weight-medium"
        >Gestión de Tableros</label
      >
    </div>
    <q-separator></q-separator>
    <br />

    <div class="q-pa-md">
      <!-- Tabla -->
      <q-table
        ref="tableRef"
        tabindex="0"
        title="Lista de Tableros"
        :rows="adminStore.gestionTablero"
        :columns="columns"
        row-key="name"
        :filter="filter"
        no-results-label="No se encontraron Resultados"
      >
        <template #body-cell-accion="props">
          <q-td :props="props">
            <q-btn
              dense
              flat
              color="blue"
              field="edit"
              icon="visibility"
              @click="openModel(props.row)"
            >
              <!--@click="editItem(props.row)"-->
            </q-btn>
          </q-td>
        </template>

        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Buscar"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>
    <div>
      <!-- Dialogo -->
      <q-dialog
        v-model="dialog"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <q-card>
          <q-bar class="bg-blue-8">
            <q-space />
            <!-- btn Cerrar -->
            <q-btn
              dense
              flat
              icon="close"
              color="white"
              v-close-popup
              @click="vaciar()"
            >
              <q-tooltip class="bg-white text-primary">Cerrar</q-tooltip>
            </q-btn>
          </q-bar>

          <!-- Título info tablero -->
          <q-card-section class="q-pa-md">
            <div class="text-h5 text-weight-medium text-blue-grey-14">
              Información del Tablero
            </div>
            <q-separator></q-separator>
          </q-card-section>

          <!-- información tablero -->
          <q-card-section class="q-pa-md">
            <div class="row">
              <!-- Contenido -->
              <div class="col-12 col-md-4">
                <div class="q-pa-md">
                  <div class="row bordes q-pa-md">
                    <div class="col-4">
                      <div class="text-body1 blue-grey-10">Nombre:</div>
                    </div>
                    <div class="col-8 text-weight-regular text-grey-14">
                      {{ adminStore.nombreTablero }}
                    </div>
                    <div class="col-4">
                      <div class="text-body1 blue-grey-10">Año:</div>
                    </div>
                    <div class="col-8 text-weight-regular text-grey-14">
                      {{ adminStore.anio }}
                    </div>
                    <div class="col-4">
                      <div class="text-body1 blue-grey-10">Semestre:</div>
                    </div>
                    <div class="col-8 text-weight-regular text-grey-14">
                      {{ adminStore.semestre }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Contenido -->
              <div class="col-12 col-md-8">
                <div class="q-pa-md">
                  <div class="row bordes q-pa-md">
                    <div class="col-4">
                      <div class="text-body1 blue-grey-10">Integrantes:</div>
                    </div>
                    <div class="col-8">
                      <div class="row">
                        <div class="col-12">
                          <div
                            class="espacio-ocupa q-mr-sm q-mb-sm q-pa-xs bordes shadow-2 efecto-indicadores"
                            v-for="user in adminStore.usuariosTablero"
                            :key="user.Email"
                          >
                            <div
                              @click="
                                infoUsuario(
                                  (adminStore.btnOpenUserInfo = true),
                                  (adminStore.idUser = user.ID_Usuario),
                                  (adminStore.nombreUser = user.Nombre_Usuario),
                                  (adminStore.apellidoUser = user.Apellido),
                                  (adminStore.emailUser = user.Email),
                                  (adminStore.paisUser = user.Pais),
                                  (adminStore.tipoUser = user.Tipo_Usuario),
                                  (adminStore.categoriaUser =
                                    user.usuario_tableros[0].Categoria),
                                  (adminStore.descripcionUser =
                                    user.Descripcion)
                                )
                              "
                            >
                              {{ user.Nombre_Usuario }} {{ user.Apellido }}
                            </div>
                            <!-- componente infoUser -->
                            <infoUserComponent></infoUserComponent>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>

          <!-- btn Editar -->
          <div class="q-pa-md row">
            <q-btn
              icon="edit"
              class="col-12 col-md-4"
              size="md"
              label="Editar"
              color="primary"
              @click="adminStore.btnedit = true"
            >
            </q-btn>
          </div>

          <br />
          <!-- Eliminar Tablero -->
          <q-card-section class="q-pa-md">
            <div class="text-h5 text-weight-regular text-blue-grey-14">
              Eliminar Tablero
            </div>
            <q-separator></q-separator>
          </q-card-section>
          <!-- btn Eliminar -->
          <div class="row q-pa-md">
            <q-btn
              icon="delete_outline"
              class="col-12 col-md-4"
              size="md"
              label="Eliminar"
              color="negative"
              @click="
                (boardStore.openDialogDelete = true),
                  (boardStore.TituloDelete = 'Tablero')
              "
            ></q-btn>
          </div>
        </q-card>
      </q-dialog>
    </div>
    <editBoard></editBoard>
    <deleteBoard></deleteBoard>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import deleteBoard from "src/components/board/deleteComponent.vue";
import editBoard from "src/components/admin/editBoardComponent.vue";
import infoUserComponent from "src/components/admin/InfoUserComponent.vue";
import { useNotify } from "src/composables/notifyHook";

import { useBoardStore } from "src/stores/board-store";
import { useAdminStore } from "src/stores/admin-store";
import { useAccessStore } from "src/stores/access-store";

const { errorNotify } = useNotify();

const tableRef = ref(null);
const navigationActive = ref(false);
const pagination = ref({});
const selected = ref([]);
const filter = ref("");
const dialog = ref(false);
const maximizedToggle = ref(true);
const boardStore = useBoardStore();
const adminStore = useAdminStore();
const accessStore = useAccessStore();

adminStore.getBoards();

const boards = adminStore.gestionTablero;

const selected_row = ref({});

const idreq = ref(null);

const openModel = async (row) => {
  try {
    selected_row.value = row;
    /* idreq.value = accessStore.idUsuario;
    console.log(accessStore.idUsuario); */
    adminStore.idTablero = selected_row.value.ID_Tablero;
    boardStore.idTablero = selected_row.value.ID_Tablero;
    adminStore.nombreTablero = selected_row.value.Nombre_Tablero;
    adminStore.anio = selected_row.value.Anio;
    adminStore.semestre = selected_row.value.Semestre;
    adminStore.color = selected_row.value.Color;

    await adminStore.getUserBoard(adminStore.idTablero);

    dialog.value = true;
  } catch (error) {
    errorNotify();
  }
};

const infoUsuario = async (user) => {
  console.log(user);
};

const vaciar = async () => {
  location.reload();
};

const columns = [
  {
    name: "Nombre_Tablero",
    required: true,
    label: "Nombre Tablero",
    align: "left",
    field: "Nombre_Tablero",
    //field: (boards) => boards.Nombre_Tablero,
    //format: (val) => `${val}`,
    sortable: true,
  },

  {
    name: "Anio",
    label: "Año",
    align: "center",
    field: "Anio",
    sortable: true,
  },

  {
    name: "Semestre",
    label: "Semestre",
    align: "center",
    field: "Semestre",
    sortable: true,
  },
  {
    name: "accion",
    label: "Acción",
    align: "center",
    field: (boards) => boards.ID_Tablero,
  },

  //sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
];
</script>

<style lang="scss" scoped>
.card {
  text-decoration: none;
  color: black;
}
.principal {
  background: url("src/assets/perfil.png");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}
.my-menu-link {
  color: #1976d2;
}
.bordes {
  border: 1px solid;
  border-radius: 10px;
  color: $blue-grey-14;
}

.espacio-ocupa {
  display: inline-block;
}

.efecto-indicadores:hover {
  cursor: pointer;
  background-color: $blue-grey-2;
}
.efecto-indicadores {
  background-color: white;
}
</style>
