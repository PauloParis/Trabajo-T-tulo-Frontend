<template>
  <div></div>
</template>

<script setup></script>

<!-- <template>
  <div class="q-mt-md">
    <Doughnut
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
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, DoughnutController } from "chart.js";
import { computed, ref } from "@vue/runtime-core";
import { useAdminStore } from "src/stores/admin-store";
import { useMetricStore } from "src/stores/metric-store";

const adminStore = useAdminStore();
const metricStore = useMetricStore();

const loaded = ref(true);

ChartJS.register(DoughnutController, ArcElement);

const width = ref({ type: Number, default: 300 });
const height = ref({
  type: Number,
  default: 300,
});

//SOLO HACER UN FOR
for (let happy = 0; happy < metricStore.GraficoCiclos.length; happy++) {
  adminStore.Felicidad.push(metricStore.GraficoCiclos[happy].Felicidad_Ciclo);
}

for (let name = 0; name < metricStore.GraficoCiclos.length; name++) {
  adminStore.Ciclo.push(metricStore.GraficoCiclos[name].Nombre_Ciclo);
}

const chartData = computed(() => ({
  labels: adminStore.Ciclo,
  datasets: [
    {
      //label: "Ciclo 1",
      data: adminStore.Felicidad,
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
        "rgb(102,255,179)",
        "rgb(255,102,255)",
        "rgb(153,255,255)",
      ],
      borderColor: "rgba(0, 0, 0, 0.1)",
    },
  ],
}));

const chartOptions = ref({
  plugins: {
    /* title: {
      display: true,
      text: "CICLOS",
    }, */
  },
  aspectRatio: 2,
});
</script>
 -->
