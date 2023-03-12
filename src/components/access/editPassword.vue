<template>
  <div>
    <q-btn icon="key" color="accent" @click="prompt = true" style="width: 100%">
      <div class="q-pl-sm">Cambiar Contraseña</div></q-btn
    >
  </div>

  <div class="q-pa-md">
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Cambiar Contraseña</div>
          <q-separator></q-separator>
        </q-card-section>

        <q-form class="q-pa-md" @submit.prevent="editarContrasena">
          <q-input
            v-model="accessStore.password.PasswordActual"
            :type="isPwd ? 'password' : 'text'"
            label="Contraseña Actual"
            hint=""
            :rules="[
              (val) =>
                (val && val.length > 5) || 'La contraseña mínimo 6 caracteres',
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <q-input
            v-model="accessStore.password.PasswordNueva"
            :type="isPwd2 ? 'password' : 'text'"
            label="Nueva Contraseña (Mínimo 6 caracteres)"
            hint=""
            :rules="[
              (val) =>
                (val && val.length > 5) || 'La contraseña mínimo 6 caracteres',
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd2 ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd2 = !isPwd2"
              />
            </template>
          </q-input>

          <q-input
            v-model="accessStore.password.RePassword"
            :type="isPwd3 ? 'password' : 'text'"
            label="Repetir Nueva Contraseña"
            hint=""
            :rules="[
              (val) =>
                (val &&
                  val.length > 5 &&
                  val == accessStore.password.PasswordNueva) ||
                'Las Contraseñas no Coinciden',
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd3 ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd3 = !isPwd3"
              />
            </template>
          </q-input>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancelar" class="text-negative" v-close-popup />
            <q-btn
              flat
              label="Guardar"
              @click="msgPass"
              type="submit"
              v-close-popup="1"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAccessStore } from "src/stores/access-store";
import { useNotify } from "src/composables/notifyHook";
import { useQuasar } from "quasar";

const { successNotify, errorNotify } = useNotify();
const accessStore = useAccessStore();
7;
const $q = useQuasar();

const prompt = ref(false);
const isPwd = ref(true);
const isPwd2 = ref(true);
const isPwd3 = ref(true);

function msgPass() {
  if (accessStore.password.PasswordNueva !== accessStore.password.RePassword) {
    errorNotify("Las Contraseñas No Coinciden");
  }
  if (
    accessStore.password.PasswordActual == null ||
    accessStore.password.PasswordNueva == null ||
    accessStore.password.RePassword == null
  ) {
    errorNotify("Por favor Complete todos los Campos");
  }
}

const editarContrasena = async () => {
  try {
    $q.loading.show();
    await accessStore.editPassUser();
    successNotify("La Contraseña fue Actualizada Correctamente");
    accessStore.password.PasswordActual = "";
    accessStore.password.PasswordNueva = "";
    accessStore.password.RePassword = "";
  } catch (error) {
    errorNotify(error);
  } finally {
    $q.loading.hide();
  }
};
</script>
