<template>
  <div>
    <Bar
      v-if="loaded"
      :chart-options="chartOptions"
      :chart-data="chartData"
      :plugins="plugins"
      :width="width"
      :height="height"
    />
  </div>
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
  default: 400,
});

const dataValues = ref([[1, 3, 5]]);

const chartData = computed(() => ({
  labels: ["Entorno", "Framework", "Equipo"],

  datasets: [
    {
      label: "Ciclo 1",

      data: dataValues.value[0],
      backgroundColor: "rgb(0, 0, 163)",
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
  indexAxis: "y",
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  categoryPercentage: 1,
  barPercentage: 0.5,
});
</script>
