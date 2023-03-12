<template>
  <q-layout class="bg-blue-grey-1" view="hHh Lpr lFf">
    <q-page-container>
      <q-page padding class="row items-center justify-center">
        <div class="row full-width">
          <div class="col-md-8 offset-md-2 col-xs-12 q-pl-md q-pr-md q-pt-sm">
            <q-card flat class="bg-white text-black radius">
              <div class="q-pa-md">
                <div class="row justify-between items-center">
                  <div class="col-md-5 justify-end text-blue-grey-14 text-h4">
                    Registrarse
                  </div>
                  <div class="col-md-4 offset-md-3 text-blue-grey-14 text-h6">
                    <img src="src/assets/utem-logo.png" style="width: 200px" />
                  </div>
                </div>

                <div class="col-md-12 col-xs-12 q-pt-md">
                  <div class="">
                    <q-form @submit.prevent="handleSubmit" class="q-gutter-sm">
                      <q-input
                        filled
                        v-model="nombre_usuario"
                        label="Ingrese su Nombre"
                        :rules="[
                          (val) =>
                            (val && val.length > 2) ||
                            'Porfavor Ingrese Nombre(s)',
                        ]"
                      />

                      <q-input
                        filled
                        v-model="apellido"
                        label="Ingrese su Apellido"
                        :rules="[
                          (val) =>
                            (val && val.length > 2) ||
                            'Porfavor Ingrese Apellido(s)',
                        ]"
                      />

                      <q-select
                        filled
                        v-model="pais"
                        :options="paises"
                        label="Escoja País"
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'Porfavor Seleccione un País',
                        ]"
                      />

                      <q-input
                        filled
                        v-model="email"
                        label="Ingrese su Correo Electrónico"
                        :rules="[
                          (val) =>
                            (val && /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val)) ||
                            'Formato Email Incorrecto',
                        ]"
                      />

                      <q-input
                        filled
                        v-model="password"
                        type="password"
                        label="Ingrese su Contraseña"
                        :rules="[
                          (val) =>
                            (val && val.length > 5) ||
                            'La contraseña mínimo 6 caracteres',
                        ]"
                      />
                      <q-input
                        filled
                        v-model="repassword"
                        type="password"
                        label="Repita Contraseña"
                        :rules="[
                          (val) =>
                            (val && val.length > 5 && val == password) ||
                            'Las Contraseñas no Coinciden',
                        ]"
                      />

                      <div class="q-pa-md">
                        <q-btn
                          label="Registrarse"
                          type="submit"
                          color="primary"
                        />
                        <q-btn
                          label="Iniciar Sesión"
                          to="/login"
                          color="primary"
                          flat
                          class="q-ml-sm"
                        />
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
import { useNotify } from "src/composables/notifyHook";
import { useQuasar } from "quasar";

const accessStore = useAccessStore();
const router = useRouter();
const { successNotify, errorNotify } = useNotify();
const $q = useQuasar();

const nombre_usuario = ref("");
const apellido = ref("");
const pais = ref("");
const email = ref("");
const password = ref("");
const repassword = ref("");
const paises = [
  "Afganistán",
  "Albania",
  "Alemania",
  "Andorra",
  "Angola",
  "Antigua y Barbuda",
  "Arabia Saudita",
  "Argelia",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaiyán",
  "Bahamas",
  "Bangladés",
  "Barbados",
  "Baréin",
  "Bélgica",
  "Belice",
  "Benín",
  "Bielorrusia",
  "Birmania",
  "Bolivia",
  "Bosnia y Herzegovina",
  "Botsuana",
  "Brasil",
  "Brunéi",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Bután",
  "Cabo Verde",
  "Camboya",
  "Camerún",
  "Canadá",
  "Catar",
  "Chad",
  "Chile",
  "China",
  "Chipre",
  "Ciudad del Vaticano",
  "Colombia",
  "Comoras",
  "Corea del Norte",
  "Corea del Sur",
  "Costa de Marfil",
  "Costa Rica",
  "Croacia",
  "Cuba",
  "Dinamarca",
  "Dominica",
  "Ecuador",
  "Egipto",
  "El Salvador",
  "Emiratos Árabes Unidos",
  "Eritrea",
  "Eslovaquia",
  "Eslovenia",
  "España",
  "Estados Unidos",
  "Estonia",
  "Etiopía",
  "Filipinas",
  "Finlandia",
  "Fiyi",
  "Francia",
  "Gabón",
  "Gambia",
  "Georgia",
  "Ghana",
  "Granada",
  "Grecia",
  "Guatemala",
  "Guyana",
  "Guinea",
  "Guinea ecuatorial",
  "Guinea-Bisáu",
  "Haití",
  "Honduras",
  "Hungría",
  "India",
  "Indonesia",
  "Irak",
  "Irán",
  "Irlanda",
  "Islandia",
  "Islas Marshall",
  "Islas Salomón",
  "Israel",
  "Italia",
  "Jamaica",
  "Japón",
  "Jordania",
  "Kazajistán",
  "Kenia",
  "Kirguistán",
  "Kiribati",
  "Kuwait",
  "Laos",
  "Lesoto",
  "Letonia",
  "Líbano",
  "Liberia",
  "Libia",
  "Liechtenstein",
  "Lituania",
  "Luxemburgo",
  "Madagascar",
  "Malasia",
  "Malaui",
  "Maldivas",
  "Malí",
  "Malta",
  "Marruecos",
  "Mauricio",
  "Mauritania",
  "México",
  "Micronesia",
  "Moldavia",
  "Mónaco",
  "Mongolia",
  "Montenegro",
  "Mozambique",
  "Namibia",
  "Nauru",
  "Nepal",
  "Nicaragua",
  "Níger",
  "Nigeria",
  "Noruega",
  "Nueva Zelanda",
  "Omán",
  "Países Bajos",
  "Pakistán",
  "Palaos",
  "Palestina",
  "Panamá",
  "Papúa Nueva Guinea",
  "Paraguay",
  "Perú",
  "Polonia",
  "Portugal",
  "Reino Unido",
  "República Centroafricana",
  "República Checa",
  "República de Macedonia",
  "República del Congo",
  "República Democrática del Congo",
  "República Dominicana",
  "República Sudafricana",
  "Ruanda",
  "Rumanía",
  "Rusia",
  "Samoa",
  "San Cristóbal y Nieves",
  "San Marino",
  "San Vicente y las Granadinas",
  "Santa Lucía",
  "Santo Tomé y Príncipe",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leona",
  "Singapur",
  "Siria",
  "Somalia",
  "Sri Lanka",
  "Suazilandia",
  "Sudán",
  "Sudán del Sur",
  "Suecia",
  "Suiza",
  "Surinam",
  "Tailandia",
  "Tanzania",
  "Tayikistán",
  "Timor Oriental",
  "Togo",
  "Tonga",
  "Trinidad y Tobago",
  "Túnez",
  "Turkmenistán",
  "Turquía",
  "Tuvalu",
  "Ucrania",
  "Uganda",
  "Uruguay",
  "Uzbekistán",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Yibuti",
  "Zambia",
  "Zimbabue",
];

const handleSubmit = async () => {
  try {
    $q.loading.show();
    await accessStore.register(
      nombre_usuario.value,
      apellido.value,
      pais.value,
      email.value,
      password.value,
      repassword.value
    );
    successNotify("Registro Exitoso");
    router.push("/login");
  } catch (error) {
    errorNotify(error + " Ingresar Otro Email");
  } finally {
    $q.loading.hide();
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
