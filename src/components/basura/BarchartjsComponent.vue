<template>
  <Bar
    v-if="loaded"
    :chart-options="chartOptions"
    :chart-data="chartData"
    :plugins="plugins"
    :width="width"
    :height="height"
  />
</template>

<script setup>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { computed, ref } from "@vue/runtime-core";
import { useAdminStore } from "src/stores/admin-store";

const adminStore = useAdminStore();

const loaded = ref(true);

ChartJS.register(
  Title, //Titulo del grafico
  Tooltip,
  Legend, //información dentro del grafico
  BarElement,
  CategoryScale,
  LinearScale
);

const width = ref({
  type: Number,
  default: 400,
});
const height = ref({
  type: Number,
  default: 800,
});

const dataValues = ref([]);

console.log("Largo", adminStore.GraficoIndicadores.length);

for (var cycle = 0; cycle < adminStore.GraficoIndicadores.length; cycle++) {
  adminStore.Ciclo.push(adminStore.GraficoIndicadores[cycle].Nombre_Ciclo);

  for (
    var indicator = 0;
    indicator < adminStore.GraficoIndicadores[cycle].indicadores.length;
    indicator++
  ) {
    adminStore.Felicidad.push(
      adminStore.GraficoIndicadores[cycle].indicadores[indicator]
        .Felicidad_Indicador
    );
    console.log(
      "felicidad",
      adminStore.GraficoIndicadores[cycle].indicadores[indicator]
        .Felicidad_Indicador
    );

    adminStore.Indicador.push(
      adminStore.GraficoIndicadores[cycle].indicadores[indicator]
        .Nombre_Indicador
    );
    console.log(
      "indicador",
      adminStore.GraficoIndicadores[cycle].indicadores[indicator]
        .Nombre_Indicador
    );
  }
}

const chartData = computed(() => ({
  labels: adminStore.Indicador,
  datasets: [
    {
      //label: Ciclos.value,
      data: adminStore.Felicidad,
      backgroundColor: [
        "rgb(0,214,0)",
        "rgb(0,0,214)",
        "rgb(214,0,0)",
        "rgb(214,214,0)",
        "rgb(108,0,214)",
        "rgb(214,108,0)",
        "rgb(214,0,214)",
        "rgb(0,214,108)",
        "rgb(0,108,214)",
        "rgb(0,214,214)",
      ],
    },
  ],
}));

const chartOptions = ref({
  plugins: {
    title: {
      display: true,
      text: "BAR",
    },
  },
  barPercentage: 0.5,
});
</script>
