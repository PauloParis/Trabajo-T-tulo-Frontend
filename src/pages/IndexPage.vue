<template>
  <q-page padding class="principal">
    <div class="row justify-end">
      <div class="q-pa-xs col-12">
        <label class="text-h3 text-blue-grey-14 text-weight-medium"
          >Perfil</label
        >
      </div>
    </div>

    <q-separator></q-separator>

    <div class="row q-mt-lg">
      <div class="col-12 col-sm-8 q-pa-sm q-pb-md bg-white bordes">
        <!-- Izquierda -->
        <div class="row">
          <!-- Nombre -->
          <div
            class="col-4 q-mb-sm text-weight-medium text-blue-grey-10 text-h6"
          >
            Nombre:
          </div>
          <div class="col-8 q-pl-sm text-h6 text-weight-regular text-grey-14">
            {{ accessStore.NombreUsuario }} {{ accessStore.Apellido }}
          </div>
          <!-- País -->
          <div
            class="col-4 q-mb-sm text-weight-medium text-blue-grey-10 text-h6"
          >
            País:
          </div>
          <div class="col-8 q-pl-sm text-h6 text-weight-regular text-grey-14">
            {{ accessStore.Pais }}
          </div>
          <!-- Correo -->
          <div
            class="col-4 q-mb-sm text-weight-medium text-blue-grey-10 text-h6"
          >
            Email:
          </div>
          <div class="col-8 q-pl-sm text-h6 text-weight-regular text-grey-14">
            {{ accessStore.Correo }}
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
              <q-card class="bg-grey-2" flat bordered>
                <q-card-section v-html="accessStore.Descripcion" />
              </q-card>
            </q-scroll-area>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-4 q-pa-sm text-center">
        <!-- Derecha -->
        <editUser></editUser>
        <editPassword></editPassword>

        <div class="q-ma-sm text-body1">Tipo de Cuenta</div>
        <div
          class="q-ma-sm text-weight-regular text-h5 text-indigo-10 text-uppercase"
        >
          {{ accessStore.typeuser }}
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useAccessStore } from "src/stores/access-store";
import editUser from "src/components/access/Perfil/editUser.vue";
import editPassword from "src/components/access/Perfil/editPassword.vue";

const accessStore = useAccessStore();
const editor = accessStore.Descripcion;
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

<!--
  <br>
    <br>
    <div class="float-right bg-yellow q-pa-sm principal">
      div class="q-pa-xs q-gutter-xs row fixed-right"
      <editUser></editUser>
      <editPassword></editPassword>
      <div class="column items-center">
        <div class="col justify-center q-ma-sm text-body1">Tipo de Cuenta</div>
        <div
          class="col q-ma-sm text-weight-regular text-h5 text-indigo-10 text-uppercase"
        >
          {{ accessStore.typeuser }}
        </div>
      </div>
    </div>

    <br />
    <div class="q-pa-sm q-pb-md bg-green" style="border: 2px solid">
      <div class="row items-center">
        nombre
        <div
          class="col-3 row justify-start text-weight-medium text-blue-grey-10 q-ma-sm text-h6"
        >
          Nombre:
        </div>
        <div class="col-8 q-ml-xl text-h6 text-weight-regular text-grey-14">
          {{ accessStore.NombreUsuario }} {{ accessStore.Apellido }}
        </div>
      </div>
      <div class="row items-center">
        pais
        <div
          class="col-3 row justify-start text-weight-medium text-blue-grey-10 q-ma-sm text-h6"
        >
          País:
        </div>
        <div class="col-8 q-ml-xl text-h6 text-weight-regular text-grey-14">
          {{ accessStore.Pais }}
        </div>
      </div>
      <div class="row items-center">
        correo
        <div
          class="col-3 row justify-start text-weight-medium text-blue-grey-10 q-ma-sm text-h6"
        >
          Correo:
        </div>
        <div class="col-8 q-ml-xl text-h6 text-weight-regular text-grey-14">
          {{ accessStore.Correo }}
        </div>
      </div>

      <div class="row items-center">
        descripsión
        <div
          class="col-3 row justify-start text-weight-medium text-blue-grey-10 q-ma-sm text-h6"
        >
          Descripción:
        </div>
      </div>
      <div class="row bg-pink q-ml-xl text-body1">
        cuadro descripción
        <div class="col-md-3"></div>
        <div class="col col-md-6 text-grey-14">
          <q-card flat bordered style="max-width: 30rem; min-height: 5rem">
            <q-card-section v-html="accessStore.Descripcion" />
          </q-card>
        </div>
      </div>
    </div>
 -->
