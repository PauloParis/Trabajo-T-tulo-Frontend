<template>
  <q-page padding class="principal">
    <div class="q-pa-xs col-12">
      <label class="text-h4 text-blue-grey-14 text-weight-medium"
        >Métricas</label
      >
    </div>
    <q-separator></q-separator>

    <br />
    <div class="q-pa-md">
      <q-table
        ref="tableRef"
        tabindex="0"
        title="Métricas"
        :rows="adminStore.MetricaBoard"
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
          <q-bar>
            <q-space />

            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip class="bg-white text-primary">Cerrar</q-tooltip>
            </q-btn>
          </q-bar>

          <q-card-section>
            <div class="text-h6">Nombre del Grupo + %de Felicidad</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row">
              <q-card class="ciclo-card col">
                <label class="text-h6">Indice de Felicidad por Ciclo</label>
                <canvas
                  id="myChart"
                  style="width: 100%; max-width: 600px"
                ></canvas>
              </q-card>
              <q-card class="indicator-card col">
                <label class="text-h6"
                  >Indice de Felicidad por Indicador</label
                ></q-card
              >
            </div>
            <div class="column">
              <q-card class="user-card col-8"
                ><label class="text-h6"
                  >Indice de Felicidad por Usuario</label
                ></q-card
              >
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
//import { useBoardStore } from "src/stores/board-store";
import { useAdminStore } from "src/stores/admin-store";
import { useQuasar } from "quasar";
const $q = useQuasar();
const adminStore = useAdminStore();

adminStore.getAdminMetric();

const selected_row = ref({});
const boards = adminStore.MetricaBoard;

/*
const abrir = async () => {
  //console.log("Entroi");
  //adminStore.idTablero = 23;
  try {
    const res = await adminStore.getAdminMetric();
  } catch (error) {}
};*/

const openModel = async (row) => {
  try {
    selected_row.value = row;
    adminStore.idTablero = selected_row.value.ID_Tablero;
    dialog.value = true;
  } catch (error) {
    console.log(error);
  }
};

//
const tableRef = ref(null);
const navigationActive = ref(false);
const pagination = ref({});
const selected = ref([]);
const filter = ref("");
const dialog = ref(false);
const maximizedToggle = ref(true);
//

const columns = [
  {
    name: "Nombre_Tablero",
    required: true,
    label: "Nombre del Grupo (Tablero)",
    align: "left",
    field: "Nombre_Tablero",
    //field: (row) => row.name,
    //format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "Felicidad_Tablero",
    align: "center",
    label: "Porcentaje de Felicidad (%)",
    field: "Felicidad_Tablero",
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
    name: "semestre",
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

  /*{
    name: "iron",
    label: "Iron (%)",
    field: "iron",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },*/
];
/*
const rows = [
  {
    id: 1,
    name: "Frozen Yogurt",
    porcentajeFelicidad: 159,
    anio: 6.0,
    semestre: 24,
  },
  {
    id: 2,
    name: "Ice cream sandwich",
    porcentajeFelicidad: 237,
    anio: 9.0,
    semestre: 37,
  },
  {
    id: 3,
    name: "Eclair",
    porcentajeFelicidad: 262,
    anio: 16.0,
    semestre: 23,
  },
  {
    id: 4,
    name: "Cupcake",
    porcentajeFelicidad: 305,
    anio: 3.7,
    semestre: 67,
  },
  {
    id: 5,
    name: "Gingerbread",
    porcentajeFelicidad: 356,
    anio: 16.0,
    semestre: 49,
  },
  {
    id: 6,
    name: "Jelly bean",
    porcentajeFelicidad: 375,
    anio: 0.0,
    semestre: 94,
  },
  {
    id: 7,
    name: "Lollipop",
    porcentajeFelicidad: 392,
    anio: 0.2,
    semestre: 98,
  },
  {
    id: 8,
    name: "Honeycomb",
    porcentajeFelicidad: 408,
    anio: 3.2,
    semestre: 87,
  },
  {
    id: 9,
    name: "Donut",
    porcentajeFelicidad: 452,
    anio: 25.0,
    semestre: 51,
  },
  {
    id: 10,
    name: "KitKat",
    porcentajeFelicidad: 518,
    anio: 26.0,
    semestre: 65,
  },
  {
    id: 11,
    name: "Frozen Yogurt-1",
    porcentajeFelicidad: 159,
    anio: 6.0,
    semestre: 24,
  },
  {
    id: 12,
    name: "Ice cream sandwich-1",
    porcentajeFelicidad: 237,
    anio: 9.0,
    semestre: 37,
  },
  {
    id: 13,
    name: "Eclair-1",
    porcentajeFelicidad: 262,
    anio: 16.0,
    semestre: 23,
  },
  {
    id: 14,
    name: "Cupcake-1",
    porcentajeFelicidad: 305,
    anio: 3.7,
    semestre: 67,
  },
  {
    id: 15,
    name: "Gingerbread-1",
    porcentajeFelicidad: 356,
    anio: 16.0,
    semestre: 49,
  },
  {
    id: 16,
    name: "Jelly bean-1",
    porcentajeFelicidad: 375,
    anio: 0.0,
    semestre: 94,
  },
  {
    id: 17,
    name: "Lollipop-1",
    porcentajeFelicidad: 392,
    anio: 0.2,
    semestre: 98,
  },
  {
    id: 18,
    name: "Honeycomb-1",
    porcentajeFelicidad: 408,
    anio: 3.2,
    semestre: 87,
  },
  {
    id: 19,
    name: "Donut-1",
    porcentajeFelicidad: 452,
    anio: 25.0,
    semestre: 51,
  },
  {
    id: 20,
    name: "KitKat-1",
    porcentajeFelicidad: 518,
    anio: 26.0,
    semestre: 65,
  },
  {
    id: 21,
    name: "Frozen Yogurt-2",
    porcentajeFelicidad: 159,
    anio: 6.0,
    semestre: 24,
  },
  {
    id: 22,
    name: "Ice cream sandwich-2",
    porcentajeFelicidad: 237,
    anio: 9.0,
    semestre: 37,
  },
  {
    id: 23,
    name: "Eclair-2",
    porcentajeFelicidad: 262,
    anio: 16.0,
    semestre: 23,
  },
  {
    id: 24,
    name: "Cupcake-2",
    porcentajeFelicidad: 305,
    anio: 3.7,
    semestre: 67,
  },
  {
    id: 25,
    name: "Gingerbread-2",
    porcentajeFelicidad: 356,
    anio: 16.0,
    semestre: 49,
  },
  {
    id: 26,
    name: "Jelly bean-2",
    porcentajeFelicidad: 375,
    anio: 0.0,
    semestre: 94,
  },
  {
    id: 27,
    name: "Lollipop-2",
    porcentajeFelicidad: 392,
    anio: 0.2,
    semestre: 98,
  },
  {
    id: 28,
    name: "Honeycomb-2",
    porcentajeFelicidad: 408,
    anio: 3.2,
    semestre: 87,
  },
  {
    id: 29,
    name: "Donut-2",
    porcentajeFelicidad: 452,
    anio: 25.0,
    semestre: 51,
  },
  {
    id: 30,
    name: "KitKat-2",
    porcentajeFelicidad: 518,
    anio: 26.0,
    semestre: 65,
  },
];*/

//adminStore.getAdminUsers();
</script>

<style lang="scss" scoped>
.ciclo-card {
  height: 300px;
}

.indicator-card {
  height: 300px;
}

.user-card {
  height: 300px;
}

.principal {
  background: url("src/assets/perfil.png");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
