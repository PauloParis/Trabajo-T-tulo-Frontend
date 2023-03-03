<template>
  <q-page padding class="principal">
    <div class="q-pa-xs col-12">
      <label class="text-h4 text-blue-grey-14 text-weight-medium"
        >Configuración</label
      >
    </div>
    <q-separator></q-separator>
    <br />
    <br />
    <label class="text-h5">Eliminar Cuenta</label>

    <br />
    <br />
    <div class="column q-pa-xs">
      <q-btn class="col" color="negative" size="lg" @click="promt = true"
        >Eliminar Cuenta</q-btn
      >
      <template>
        <div class="q-pa-md q-gutter-sm">
          <q-dialog v-model="promt" persistent>
            <q-card style="min-width: 400px">
              <q-card-section>
                <div class="text-h6">Eliminar Cuenta</div>
                <q-separator></q-separator>
              </q-card-section>

              <div class="q-pa-md column items-center">
                <label class="col text-h6 text-red">
                  ¿Está Seguro de ELiminar la Cuenta?
                </label>
                <br />
                <p class="col text-body1">
                  La eliminación de los Datos es permanente y NO será Posible
                  Recuperar la información de Cuenta.
                </p>
                <p class="col text-body1">
                  Así también, la Información de los Tableros Creados,
                  Invitaciones Recibidas, Evaluaciones o cualquier otra acción
                  relacionada en la plataforma, se eliminara por Completo.
                </p>
                <p class="col text-body1 text-green">
                  Recuerde que, si elimina sus tableros, también se eliminarán
                  para aquellos usuarios colaboradores de estos.
                </p>
              </div>

              <q-card-actions align="right" class="text-primary">
                <br />
                <q-btn
                  flat
                  label="Cancelar"
                  class="text-negative"
                  v-close-popup
                />
                <q-btn
                  flat
                  label="Confirmar"
                  @click="promt2 = true"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </template>
      <template>
        <div class="q-pa-md q-gutter-sm">
          <q-dialog v-model="promt2" persistent>
            <q-card style="min-width: 400px">
              <q-card-section>
                <div class="text-h6">Eliminar Cuenta</div>
                <q-separator></q-separator>
              </q-card-section>

              <div class="q-pa-md column items-center">
                <label class="col text-h6 text-red">
                  ¿Está Realmente Seguro de ELiminar la Cuenta?
                </label>
                <br />
              </div>

              <q-card-actions align="right" class="text-primary">
                <br />
                <q-btn
                  flat
                  label="Cancelar"
                  class="text-negative"
                  v-close-popup
                />
                <q-btn
                  flat
                  label="Confirmar"
                  @click="EliminarCuenta"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </template>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useAccessStore } from "src/stores/access-store";
import { useNotify } from "src/composables/notifyHook";
import { useRouter } from "vue-router";

const router = useRouter();
const { successNotify, errorNotify } = useNotify();
const promt = ref(false);
const promt2 = ref(false);
const accessStore = useAccessStore();

const EliminarCuenta = async () => {
  try {
    const res = await accessStore.deleteUser();
    successNotify("Se Elimino la Cuenta con Exito FFFFFFFFF");
    accessStore.logout();
    router.push("/login");
  } catch (error) {
    errorNotify(error.error);
  }
};
</script>

<style lang="scss" scoped>
.principal {
  background: url("src/assets/perfil.png");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
