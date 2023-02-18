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
        :columns="columns"
        :rows="adminStore.gestionTablero"
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
            ></q-btn
          ></q-td>
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
        transition-show="slide-up"
        transition-hide="slide-down"
        :maximized="maximizedToggle"
      >
        <q-card class="bg-blue-grey-1">
          <q-bar class="bg-blue-8">
            <q-space></q-space>
            <q-btn
              dense
              flat
              icon="close"
              color="white"
              @click="vaciar()"
              v-close-popup
            >
              <q-tooltip class="bg-white text-primary">Cerrar</q-tooltip>
            </q-btn>
          </q-bar>
          <q-card-section>
            <div class="text-h5 q-pb-md">{{ adminStore.nombreTablero }}</div>
            <div class="text-h6 text-weight-regular text-blue-grey-14">
              Indice de Felicidad Grupo: {{ adminStore.felicidadTablero }} %
            </div>
          </q-card-section>

          <q-card-section class="q-pa-none">
            <div class="q-pa-md">
              <div class="row">
                <q-card class="ciclo-card col q-pa-md">
                  <label class="text-h6 text-blue-grey-14"
                    >Indice de Felicidad por Ciclo</label
                  >
                  <DoughnutchartjsComponent
                    class="q-pa-md"
                  ></DoughnutchartjsComponent>
                </q-card>

                <q-card class="indicator-card col q-pa-md">
                  <label class="text-h6 text-blue-grey-14"
                    >Indice de Felicidad por Indicador</label
                  >
                  <div><InficatorChart></InficatorChart></div>
                </q-card>
              </div>
              <div class="column">
                <q-card class="user-card col-8 q-pa-md"
                  ><label class="text-h6 text-blue-grey-14"
                    >Indice de Felicidad por Usuario</label
                  >
                  <DoughnutUser />
                </q-card>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useAdminStore } from "src/stores/admin-store";
import { useMetricStore } from "src/stores/metric-store";

import DoughnutchartjsComponent from "src/components/metric/DoughnutchartjsComponent.vue";
import DoughnutUser from "src/components/metric/DoughnutUserComponent.vue";
import InficatorChart from "src/components/metric/indicadoresComponent.vue";

const loaded = ref(true);
const tableRef = ref(null);
const filter = ref("");
const dialog = ref(false);
const maximizedToggle = ref(true);

const adminStore = useAdminStore();
const metricStore = useMetricStore();

adminStore.getBoards();

const boards = adminStore.gestionTablero;

const selected_row = ref({});

const vaciar = async () => {
  adminStore.Felicidad = [];
  adminStore.Ciclo = [];
  adminStore.Indicador = [];
  adminStore.Usuario = [];
  adminStore.NombreCiclo = [];
  adminStore.FelicidadIndicador = [];
  metricStore.MetricaBoard = [];
  metricStore.GraficoCiclos = [];
  metricStore.GraficoUsuarios = [];
  metricStore.GraficoIndicadores = [];
  metricStore.GraficoIndicadores2 = [];
};

const openModel = async (row) => {
  try {
    selected_row.value = row;
    adminStore.idTablero = selected_row.value.ID_Tablero;
    adminStore.nombreTablero = selected_row.value.Nombre_Tablero;
    adminStore.felicidadTablero = selected_row.value.Felicidad_Tablero;

    const res = await metricStore.getAdminMetric();
    dialog.value = true;
  } catch (error) {
    console.log(error);
  }
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
    name: "Felicidad_Tablero",
    require: true,
    label: "Felicidad Tablero %",
    align: "center",
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
.principal {
  background: url("src/assets/perfil.png");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}

.ciclo-card {
  height: 500px;
}

.indicator-card {
  height: 500px;
}

.user-card {
  height: 500px;
}
</style>
