<template>
  <div>
    <q-btn
      icon="key"
      color="yellow-9"
      @click="prompt = true"
      style="width: 100%"
    >
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
            v-model="accessStore.PasswordActual"
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
            v-model="accessStore.PasswordNueva"
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
            v-model="accessStore.RePassword"
            :type="isPwd3 ? 'password' : 'text'"
            label="Repetir Nueva Contraseña"
            hint=""
            :rules="[
              (val) =>
                (val && val.length > 5 && val == accessStore.PasswordNueva) ||
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
import { useQuasar } from "quasar";

const $q = useQuasar();
const accessStore = useAccessStore();

const prompt = ref(false);

const isPwd = ref(true);
const isPwd2 = ref(true);
const isPwd3 = ref(true);

function msgPass() {
  if (accessStore.PasswordNueva !== accessStore.RePassword) {
    $q.notify({
      type: "negative",
      message: "Error - Las Contraseñas No Coinciden",
    });
  }
  if (
    accessStore.PasswordActual == null ||
    accessStore.PasswordNueva == null ||
    accessStore.RePassword == null
  ) {
    $q.notify({
      type: "negative",
      message: "Error - Por favor Complete todos los Campos",
    });
  }
}

const editarContrasena = async () => {
  try {
    await accessStore.editPassUser();

    $q.notify({
      type: "positive",
      message: "La Contraseña fue Actualizada Correctamente",
    });
  } catch (error) {
    $q.notify({
      type: "negative",
      message: error.error,
    });
  }
};
</script>
