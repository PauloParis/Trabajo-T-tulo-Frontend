<template>
  <q-layout class="bg-blue-grey-1" view="hHh Lpr lFf">
    <q-page-container>
      <q-page padding class="row items-center justify-center">
        <div class="row" style="width: 1000px">
          <div class="col-md-8 offset-md-2 col-xs-12 q-pl-md q-pr-md q-pt-sm">
            <q-card flat class="bg-white text-black radius">
              <div>
                <div class="col-md-6 col-xs-12">
                  <div class="q-pa-md">
                    <div class="row justify-between items-center">
                      <div
                        class="col-md-6 justify-end text-blue-grey-14 text-h4"
                      >
                        Iniciar Sesión
                      </div>
                      <div
                        class="col-md-4 offset-md-2 text-blue-grey-14 text-h6"
                      >
                        <img
                          src="src/assets/utem-logo.png"
                          style="width: 200px"
                        />
                      </div>
                    </div>

                    <q-form class="q-gutter-md" @submit.prevent="handleSubmit">
                      <q-input
                        filled
                        v-model="email"
                        type="text"
                        label="Ingrese Correo Electrónico"
                        hint=""
                        :rules="[
                          (val) =>
                            (val && /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val)) ||
                            'Formato email incorrecto',
                        ]"
                      />
                      <q-input
                        filled
                        v-model="password"
                        type="password"
                        label="Ingrese Contraseña"
                        hint=""
                        :rules="[
                          (val) =>
                            (val && val.length > 5) ||
                            'La contraseña mínimo 6 caracteres',
                        ]"
                      />
                      <div class="row justify-between">
                        <div class="col-6">
                          <q-btn
                            label="Iniciar Sesión"
                            type="submit"
                            color="primary"
                          />
                          <q-btn
                            label="Registrarse"
                            to="/register"
                            color="primary"
                            flat
                            class="q-ml-sm"
                          />
                        </div>

                        <div class="col-4"></div>
                      </div>
                    </q-form>
                  </div>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useAccessStore } from "src/stores/access-store";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const accessStore = useAccessStore();
const router = useRouter();
const $q = useQuasar();

const email = ref("");
const password = ref("");

const handleSubmit = async () => {
  try {
    await accessStore.access(email.value, password.value);
    router.push("/account");
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Email o Contraseña Incorrecta",
    });
  }
};
</script>

<style lang="scss" scoped>
.principal {
  background: url("src/assets/fondo-utem2.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
