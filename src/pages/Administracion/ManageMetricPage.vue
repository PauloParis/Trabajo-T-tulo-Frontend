<template>
  <q-page padding class="principal">
    <div class="q-pa-xs">
      <!-- Título Page -->
      <label class="text-h4 text-blue-grey-14 text-weight-medium"
        >Métricas</label
      >
    </div>
    <q-separator></q-separator>
    <br />
    <div class="q-pa-md">
      <!-- Tabla -->
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
      <!-- Dialogo -->
      <q-dialog
        v-model="dialog"
        persistent
        transition-show="slide-up"
        transition-hide="slide-down"
        :maximized="maximizedToggle"
      >
        <q-card class="bg-blue-grey-1">
          <q-bar class="bg-blue-8">
            <q-space />
            <!-- btn Cerrar -->
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

          <!-- Gráficos -->
          <q-card-section>
            <div class="row justify-center">
              <!-- Tablero -->
              <div class="col-12 q-mx-md q-mt-md col-md">
                <q-card class="q-pa-md" style="height: 272px">
                  <!-- Titulo tablero -->
                  <div class="text-body1 q-mb-md text-center text-blue-grey-14">
                    Información del Tablero
                  </div>

                  <div class="row">
                    <div class="col-6">
                      <div
                        class="text-body2 q-mt-md text-center text-weight-medium text-blue-grey-10"
                      >
                        Felicidad del Tablero:
                      </div>
                      <div
                        class="q-ma-sm text-center text-weight-bold q-mt-xl text-h4 text-primary"
                      >
                        {{ adminStore.felicidadTablero }} %
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="row items-center q-mt-md">
                        <div
                          class="col-6 text-left q-mb-sm text-weight-medium text-blue-grey-10"
                        >
                          Nombre del Tablero:
                        </div>
                        <div class="col-6 q-pl-sm">
                          {{ adminStore.nombreTablero }}
                        </div>
                        <div
                          class="col-6 text-left q-mb-sm text-weight-medium text-blue-grey-10"
                        >
                          Año:
                        </div>
                        <div class="col-6 q-pl-sm">{{ adminStore.anio }}</div>
                        <div
                          class="col-6 text-left text-weight-medium text-blue-grey-10"
                        >
                          Semestre:
                        </div>
                        <div class="col-6 q-pl-sm">
                          {{ adminStore.semestre }}
                        </div>
                      </div>
                    </div>
                  </div>
                </q-card>
              </div>
              <!-- Ciclos -->
              <div class="col-12 q-mt-md col-md">
                <q-card class="q-pa-md">
                  <!-- ciclo-card -->
                  <!-- Titulo Ciclo -->
                  <div class="text-body1 q-mb-md text-center text-blue-grey-14">
                    Indice de Felicidad por Ciclo
                  </div>
                  <!-- Grafico Cilo Componente -->
                  <CiclosGraphicComponent
                    class="row justify-center"
                    style="height: 200px"
                  />
                </q-card>
              </div>
            </div>
            <div class="row justify-center">
              <!-- Indicadores -->
              <div class="col-12 q-mx-md q-mt-md">
                <q-card class="q-pa-md alto">
                  <div class="text-body1 q-mb-md text-center text-blue-grey-14">
                    Indice de Felicidad por Indicador
                  </div>
                  <indicadoresGraphicComponent
                    class="row justify-center"
                    style="height: 50vh"
                  ></indicadoresGraphicComponent>
                </q-card>
              </div>
              <!-- Usuarios -->
              <div class="col-12 q-mx-md q-mt-md">
                <q-card class="q-pa-md"
                  ><div
                    class="text-body1 q-mb-md text-center text-blue-grey-14"
                  >
                    Indice de Felicidad por Usuario
                  </div>
                  <usuariosGraphicComponent
                    class="row justify-center"
                    style="height: 70vh"
                  ></usuariosGraphicComponent>
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
import { useNotify } from "src/composables/notifyHook";

import CiclosGraphicComponent from "src/components/metric/CiclosGraphicComponent.vue";
import indicadoresGraphicComponent from "src/components/metric/IndicadoresGraphicComponent.vue";
import usuariosGraphicComponent from "src/components/metric/UsuariosGraphicComponent.vue";

const { errorNotify } = useNotify();
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
  //metricStore.GraficoIndicadores2 = [];
};

const openModel = async (row) => {
  try {
    selected_row.value = row;
    adminStore.idTablero = selected_row.value.ID_Tablero;
    adminStore.nombreTablero = selected_row.value.Nombre_Tablero;
    adminStore.felicidadTablero = selected_row.value.Felicidad_Tablero;
    adminStore.anio = selected_row.value.Anio;
    adminStore.semestre = selected_row.value.Semestre;

    const res = await metricStore.getAdminMetric();
    dialog.value = true;
  } catch (error) {
    errorNotify();
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

@media only screen and (max-width: 450px) {
  .alto {
    height: 40vh /* 250px */;
  }
}
@media only screen and (min-width: 451px) {
  .alto {
    height: 50vh /* 350px */;
  }
}
@media only screen and (min-width: 600px) {
  .alto {
    height: 60vh;
  }
}
</style>
