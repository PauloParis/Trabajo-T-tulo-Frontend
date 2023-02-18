<template>
  <div id="container">
    <BarChart :chartData="testData" />
  </div>
</template>
<script>
import { useAdminStore } from "src/stores/admin-store";
import { useMetricStore } from "src/stores/metric-store";

import { BarChart } from "vue-chart-3";
//here using vue-chart-3
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const adminStore = useAdminStore();
const metricStore = useMetricStore();

export default {
  components: { BarChart },
  setup() {
    for (
      var cycle = 0;
      cycle < metricStore.GraficoIndicadores2.length;
      cycle++
    ) {
      adminStore.FelicidadIndicador.push(
        metricStore.GraficoIndicadores2[cycle].Felicidad_Indicador
      );

      adminStore.Indicador.push(
        metricStore.GraficoIndicadores2[cycle].Nombre_Indicador
      );
    }

    const testData = {
      labels: adminStore.Indicador,
      colors: "red",
      datasets: [
        {
          label: "INDICADORES",
          data: adminStore.FelicidadIndicador,
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
          hoverOffset: 4,
        },
      ],
    };
    return { testData };
  },
};
</script>
