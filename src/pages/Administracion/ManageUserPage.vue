<template>
  <q-page padding class="principal">
    <div class="q-pa-xs col-12">
      <nav>
        <div class="row">
          <label class="text-h4 text-blue-grey-14 text-weight-medium"
            >Gestión de Usuarios</label
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
        title="Lista de Usuarios"
        :rows="adminStore.GestionUsuario"
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
        <q-card class="bg-white">
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
            <q-card-section>
              <div class="text-h4 text-weight-medium text-blue-grey-14">
                Información del Usuario
              </div>
              <br />
              <q-separator></q-separator>
            </q-card-section>

            <q-card-section class="q-pa-md">
              <div class="row justify-between q-ma-md">
                <label class="col-2 text-h5 blue-grey-10">Nombre:</label>
                <label class="col-10 text-h6 text-weight-regular text-grey-14"
                  >{{ selected_row.Nombre_Usuario }}
                  {{ selected_row.Apellido }}</label
                >
              </div>

              <div class="row justify-between q-ma-md">
                <label class="col-2 text-h5 blue-grey-10">Correo:</label>
                <label
                  class="col-10 text-h6 text-weight-regular text-grey-14"
                  >{{ selected_row.Email }}</label
                >
              </div>
              <div class="row justify-between q-ma-md">
                <label class="col-2 text-h5 blue-grey-10">País:</label>
                <label
                  class="col-10 text-h6 text-weight-regular text-grey-14"
                  >{{ selected_row.Pais }}</label
                >
              </div>
              <div class="row justify-between q-ma-md">
                <label class="col-2 text-h5 blue-grey-10"
                  >Tipo de Cuenta:</label
                >
                <label
                  class="col-10 text-h6 text-weight-regular text-uppercase text-indigo-10"
                  >{{ adminStore.tipoUsuario }}</label
                >
              </div>
            </q-card-section>
          </div>

          <q-card-section>
            <div class="text-h4 text-weight-regular text-blue-grey-14 q-pa-md">
              Otorgar Permisos de:
            </div>
            <br />
            <q-separator></q-separator>
          </q-card-section>
          <q-card-section>
            <div class="row justify-around">
              <q-btn
                class="col-3"
                size="lg"
                icon="manage_accounts"
                label="Administrador"
                color="primary"
                @click="ChangeTypeUser(type)"
              ></q-btn>
              <q-btn
                outline
                size="lg"
                icon="person"
                label="Estandar"
                color="primary"
                class="q-ml-sm col-3"
                @click="ChangeTypeUser(type)"
              ></q-btn>
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

import { useQuasar } from "quasar";

const $q = useQuasar();
const adminStore = useAdminStore();

adminStore.getAdminUsers();

const selected_row = ref({});
const users = adminStore.GestionUsuario;

const type = ref(null);

const openModel = async (row) => {
  try {
    selected_row.value = row;
    adminStore.idUsuario = selected_row.value.ID_Usuario;
    adminStore.tipoUsuario = selected_row.value.Tipo_Usuario;
    dialog.value = true;
  } catch (error) {
    console.log(error);
  }
};

const vaciar = async () => {
  location.reload();
};

const ChangeTypeUser = async (type) => {
  try {
    if (adminStore.tipoUsuario === "Administrador") {
      type = "Estandar";
      const res = await adminStore.editAdminTypeUser(type);
    } else {
      type = "Administrador";
      const res = await adminStore.editAdminTypeUser(type);
    }

    $q.notify({
      type: "positive",
      message: "Los Permisos fueron Actualizados Correctamente",
    });
  } catch (error) {
    $q.notify({
      type: "negative",
      message: error.error,
    });
  }
};

const tableRef = ref(null);

const navigationActive = ref(false);
const pagination = ref({});
const selected = ref([]);
const filter = ref("");

const dialog = ref(false);
const maximizedToggle = ref(true);

const columns = [
  {
    name: "Nombre_Usuario",
    required: true,
    label: "Nombre",
    align: "left",
    field: "Nombre_Usuario",
    //field: (row) => row.name,
    //format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "Apellido",
    align: "center",
    label: "Apellido",
    field: "Apellido",
    sortable: true,
  },
  {
    name: "Pais",
    label: "Pais",
    align: "center",
    field: "Pais",
    sortable: true,
  },
  {
    name: "Email",
    label: "Email",
    align: "center",
    field: "Email",
    sortable: true,
  },
  {
    name: "Tipo_Usuario",
    label: "Tipo Usuario",
    align: "center",
    field: "Tipo_Usuario",
    sortable: true,
  },
  {
    name: "accion",
    label: "Acción",
    align: "center",
    field: (users) => users.ID_Usuario,
  },

  /*{
    name: "iron",
    label: "Iron (%)",
    field: "iron",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },*/
];

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
</style>
