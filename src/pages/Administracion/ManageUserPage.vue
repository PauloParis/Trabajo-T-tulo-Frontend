<template>
  <q-page padding class="principal">
    <div class="q-pa-xs">
      <!-- Título Page -->
      <label class="text-h4 text-blue-grey-14 text-weight-medium"
        >Gestión de Usuarios</label
      >
    </div>
    <q-separator></q-separator>
    <br />

    <div class="q-pa-md">
      <!-- Tabla -->

      <q-table
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
        <q-card class="bg-white">
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

          <!-- Título info usuario -->
          <q-card-section class="q-pa-md">
            <div class="text-h5 text-weight-medium text-blue-grey-14">
              Información del Usuario
            </div>
            <q-separator></q-separator>
          </q-card-section>

          <!-- Información Usuario -->
          <q-card-section class="q-pa-md">
            <div class="row">
              <div class="col-12 col-md-6 q-pa-md bordes">
                <div class="row">
                  <div class="col-4 q-mb-sm text-body1 text-blue-grey-10">
                    Nombre:
                  </div>
                  <div
                    class="col-8 q-mb-sm text-body1 text-weight-regular text-grey-14"
                  >
                    {{ selected_row.Nombre_Usuario }}
                    {{ selected_row.Apellido }}
                  </div>
                  <div class="col-4 q-mb-sm text-body1 text-blue-grey-10">
                    Email:
                  </div>
                  <div
                    class="col-8 q-mb-sm text-body1 text-weight-regular text-grey-14"
                  >
                    {{ selected_row.Email }}
                  </div>
                  <div class="col-4 q-mb-sm text-body1 text-blue-grey-10">
                    País:
                  </div>
                  <div
                    class="col-8 q-mb-sm text-body1 text-weight-regular text-grey-14"
                  >
                    {{ selected_row.Pais }}
                  </div>

                  <div class="col-4 q-mb-sm text-body1 text-blue-grey-10">
                    Tipo de Cuenta:
                  </div>
                  <div
                    class="col-8 q-mb-sm text-body1 text-weight-regular text-indigo-10 text-uppercase"
                  >
                    {{ adminStore.infoManageUser.TipoUsuario }}
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>

          <!-- Cambiar Permisos -->
          <q-card-section class="q-pa-md">
            <div class="text-h5 text-weight-regular text-blue-grey-14">
              Otorgar Permisos de:
            </div>
            <q-separator></q-separator>
          </q-card-section>

          <!-- btn admin y estandar -->
          <q-card-section>
            <div class="row justify-around">
              <q-btn
                class="col-5 col-sm-3 q-mr-sm"
                size="md"
                icon="manage_accounts"
                label="Administrador"
                color="primary"
                @click="ChangeTypeUser()"
              ></q-btn>
              <q-btn
                outline
                size="md"
                icon="person"
                label="Estandar"
                color="primary"
                class="col-5 col-sm-3"
                @click="ChangeTypeUser()"
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
import { useNotify } from "src/composables/notifyHook";
import { useQuasar } from "quasar";

const adminStore = useAdminStore();
const { successNotify, errorNotify } = useNotify();
const $q = useQuasar();

adminStore.getAdminUsers();

const selected_row = ref({});
const filter = ref("");
const dialog = ref(false);
const maximizedToggle = ref(true);

const users = adminStore.GestionUsuario;

const openModel = async (row) => {
  try {
    selected_row.value = row;
    adminStore.infoManageUser.IdUsuario = selected_row.value.ID_Usuario;
    adminStore.infoManageUser.TipoUsuario = selected_row.value.Tipo_Usuario;
    dialog.value = true;
  } catch (error) {
    errorNotify();
  }
};

const vaciar = async () => {
  location.reload();
};

const ChangeTypeUser = async () => {
  try {
    $q.loading.show();
    if (adminStore.infoManageUser.TipoUsuario === "Administrador") {
      adminStore.infoManageUser.TipoUsuario = "Estandar";
      await adminStore.editAdminTypeUser();
    } else {
      adminStore.infoManageUser.TipoUsuario = "Administrador";
      await adminStore.editAdminTypeUser();
    }

    successNotify("Los Permisos fueron Actualizados Correctamente");
  } catch (error) {
    errorNotify(error);
  } finally {
    $q.loading.hide();
  }
};

const columns = [
  {
    name: "Nombre_Usuario",
    required: true,
    label: "Nombre",
    align: "left",
    field: "Nombre_Usuario",
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
];
</script>
