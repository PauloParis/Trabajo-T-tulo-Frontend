<template>
  <q-page padding class="principal">
    <div class="q-pa-xs col-12">
      <nav>
        <div class="row">
          <label class="text-h4 text-blue-grey-14 text-weight-medium"
            >Gestión de Tableros</label
          >
        </div>
      </nav>
    </div>
    <q-separator></q-separator>

    <br />
    <div class="q-pa-md">
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

          <div class="q-pa-md">
            <q-card-section class="row justify-between">
              <div class="text-h4 col-6 text-weight-medium text-blue-grey-14">
                Información del Tablero
              </div>
            </q-card-section>
            <q-separator></q-separator>
          </div>

          <q-card-section class="q-pa-md">
            <div class="row justify-between q-ma-md">
              <label class="col-2 text-h5 blue-grey-10">Nombre:</label>
              <label class="col-10 text-h5 text-weight-regular text-grey-14">{{
                adminStore.nombreTablero
              }}</label>
            </div>
            <div class="row justify-between q-ma-md">
              <label class="col-2 text-h5 blue-grey-10">Año:</label>
              <label class="col-10 text-h5 text-weight-regular text-grey-14">{{
                adminStore.anio
              }}</label>
            </div>
            <div class="row justify-between q-ma-md">
              <label class="col-2 text-h5 blue-grey-10">Semestre:</label>
              <label class="col-10 text-h5 text-weight-regular text-grey-14">{{
                adminStore.semestre
              }}</label>
            </div>
          </q-card-section>
          <br />
          <br />
          <div class="q-pa-md row text-h4 text-weight-regular">
            <q-btn
              icon="edit"
              class="col-3"
              size="lg"
              label="Editar"
              color="primary"
              @click="adminStore.btnedit = true"
            >
            </q-btn>
          </div>
          <br />
          <q-card-section>
            <div class="q-pa-md text-h4 text-weight-regular text-blue-grey-14">
              Eliminar Tablero
            </div>

            <q-separator></q-separator>
          </q-card-section>
          <q-card-section>
            <div class="row">
              <q-btn
                icon="delete_outline"
                class="col-3"
                size="lg"
                label="Eliminar"
                color="negative"
                @click="boardStore.btndelete = true"
              ></q-btn>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <editBoard></editBoard>
    <deleteBoard></deleteBoard>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
//import editBoard from "src/components/admin/editBoardComponent.vue";
import deleteBoard from "src/components/board/deleteBoardComponent.vue";
import editBoard from "src/components/admin/editBoardComponent.vue";

import { useBoardStore } from "src/stores/board-store";
import { useAdminStore } from "src/stores/admin-store";

const tableRef = ref(null);

const navigationActive = ref(false);
const pagination = ref({});
const selected = ref([]);
const filter = ref("");

const dialog = ref(false);
const maximizedToggle = ref(true);

const boardStore = useBoardStore();
const adminStore = useAdminStore();

const prompt = ref(false);
adminStore.getBoards();

const boards = adminStore.gestionTablero;

const selected_row = ref({});

const openModel = async (row) => {
  try {
    selected_row.value = row;
    adminStore.idTablero = selected_row.value.ID_Tablero;
    boardStore.idTablero = selected_row.value.ID_Tablero;
    adminStore.nombreTablero = selected_row.value.Nombre_Tablero;
    adminStore.anio = selected_row.value.Anio;
    adminStore.semestre = selected_row.value.Semestre;
    adminStore.color = selected_row.value.Color;

    dialog.value = true;
  } catch (error) {
    console.log(error);
  }
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
  //background: Black;
}
</style>
