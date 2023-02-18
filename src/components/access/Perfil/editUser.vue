<template>
  <div>
    <q-btn
      class="bg-orange-10 text-white"
      icon="edit"
      @click="prompt = true"
      style="width: 100%"
    >
      <div class="q-pl-sm">Editar Perfil</div>
    </q-btn>
  </div>

  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Editar Perfil</div>
          <q-separator></q-separator>
        </q-card-section>

        <div class="q-pa-md">
          <q-form @submit.prevent="editarUsuario">
            <q-input
              v-model="accessStore.NombreUsuario"
              label="Nombre"
              placeholder="Ingrese Nombre"
              hint=""
              :dense="dense"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Porfavor Escriba un Nombre',
              ]"
            />
            <q-input
              v-model="accessStore.Apellido"
              label="Apellido"
              placeholder="Ingrese Apellido"
              hint=""
              :dense="dense"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Porfavor Seleccione un País',
              ]"
            />

            <q-select
              v-model="accessStore.Pais"
              :options="paises"
              label="Escoja País"
              hint=""
              :dense="dense"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Porfavor Seleccione un País',
              ]"
            />

            <label class="text-body1 text-grey-8">Descripción:</label>
            <br />
            <br />

            <q-editor
              min-height="5rem"
              max-width="10rem"
              v-model="accessStore.Descripcion"
              label="Descripción"
              :dense="dense"
            />

            <q-card-actions align="right" class="text-primary">
              <q-btn
                flat
                label="Cancelar"
                class="text-negative"
                v-close-popup
              />
              <q-btn flat label="Guardar" type="submit" v-close-popup />
            </q-card-actions>
          </q-form>
        </div>
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
const dense = ref(false);

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

const editarUsuario = async () => {
  try {
    await accessStore.editInfoUser();
    $q.notify({
      type: "positive",
      message: "El Datos fueron Actualizados Correctamente",
    });
  } catch (error) {
    $q.notify({
      type: "negative",
      message: error.error,
    });
  }
};
</script>
