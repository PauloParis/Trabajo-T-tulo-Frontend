<template>
  <q-page padding class="principal">
    <div class="q-pa-xs">
      <!-- Título Page -->
      <label class="text-h3 text-blue-grey-14 text-weight-medium">Cuenta</label>
    </div>

    <q-separator></q-separator>

    <div class="row q-mt-lg">
      <div class="col-12 col-sm-8 q-pa-sm q-pb-md bg-white bordes">
        <!-- Información Perfil -->
        <div class="row">
          <!-- Nombre -->
          <div
            class="col-4 q-mb-sm text-weight-medium text-blue-grey-10 text-h6"
          >
            Nombre:
          </div>
          <div class="col-8 q-pl-sm text-h6 text-weight-regular text-grey-14">
            {{ accessStore.infoUsuario.NombreUsuario }}
            {{ accessStore.infoUsuario.Apellido }}
          </div>
          <!-- País -->
          <div
            class="col-4 q-mb-sm text-weight-medium text-blue-grey-10 text-h6"
          >
            País:
          </div>
          <div class="col-8 q-pl-sm text-h6 text-weight-regular text-grey-14">
            {{ accessStore.infoUsuario.Pais }}
          </div>
          <!-- Correo -->
          <div
            class="col-4 q-mb-sm text-weight-medium text-blue-grey-10 text-h6"
          >
            Email:
          </div>
          <div class="col-8 q-pl-sm text-h6 text-weight-regular text-grey-14">
            {{ accessStore.infoUsuario.Email }}
          </div>
          <!-- Descripción -->
          <div
            class="col-4 q-mb-sm text-weight-medium text-blue-grey-10 text-h6"
          >
            Descripción:
          </div>
          <div class="col-8 text-body1 text-grey-14">
            <q-scroll-area
              :thumb-style="thumbStyle"
              :bar-style="barStyle"
              style="height: 150px"
            >
              <div
                class="bg-grey-2 q-pa-sm"
                v-html="accessStore.infoUsuario.Descripcion"
              ></div>
            </q-scroll-area>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-4 q-pa-sm text-center">
        <!-- Editar y Tipo de Cuenta -->
        <editUser></editUser>
        <editPassword></editPassword>

        <div class="q-ma-sm text-body1">Tipo de Cuenta</div>
        <div
          class="q-ma-sm text-weight-regular text-h5 text-indigo-10 text-uppercase"
        >
          {{ accessStore.infoUsuario.TipoUsuario }}
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useAccessStore } from "src/stores/access-store";
import editUser from "src/components/access/editUser.vue";
import editPassword from "src/components/access/editPassword.vue";

const accessStore = useAccessStore();
accessStore.getInfoUser();

const thumbStyle = {
  right: "4px",
  borderRadius: "5px",
  backgroundColor: "#027be3",
  width: "5px",
  opacity: 0.75,
};

const barStyle = {
  right: "2px",
  borderRadius: "9px",
  backgroundColor: "#027be3",
  width: "9px",
  opacity: 0.2,
};
</script>

<style lang="scss" scoped>
.principal {
  background: url("src/assets/perfil.png");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}

.bordes {
  border: 1px solid;
  border-radius: 10px;
  color: $blue-grey-14;
}
</style>
