<template>
  <div>
    <Line :data="data" :options="options"></Line>
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  Tooltip,
} from "chart.js";
import { useAdminStore } from "src/stores/admin-store";
import { useMetricStore } from "src/stores/metric-store";
import { Line } from "vue-chartjs";
import ChartDataLabels from "chartjs-plugin-datalabels";

const plugin = {
  id: "increase-legend-spacing",
  beforeInit(ChartJS) {
    const originalFit = ChartJS.legend.fit;
    ChartJS.legend.fit = function fit() {
      originalFit.bind(ChartJS.legend)();
      this.height += 20;
    };
  },
};

ChartJS.register(
  LineElement,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  ChartDataLabels
);

const adminStore = useAdminStore();
const metricStore = useMetricStore();

for (let happy = 0; happy < metricStore.GraficoCiclos.length; happy++) {
  adminStore.Felicidad.push(metricStore.GraficoCiclos[happy].Felicidad_Ciclo);
}

for (let name = 0; name < metricStore.GraficoCiclos.length; name++) {
  adminStore.Ciclo.push(metricStore.GraficoCiclos[name].Nombre_Ciclo);
}

adminStore.Ciclo.unshift("");
adminStore.Felicidad.unshift(null);

const data = {
  labels: adminStore.Ciclo, // eje horizontal
  datasets: [
    {
      label: "Ciclos",
      data: adminStore.Felicidad, // eje vertical
      backgroundColor: "rgb(75, 192, 192, 0.4)", // color puntos
      borderColor: "rgb(75, 192, 192)", // color linea
      borderWidth: 3, // ancho de la linea
      pointBorderWidth: 9, // ancho de los puntos
      pointHoverRadius: 9, // lo que crece el punto de adentro al pasar el mouse
    },
  ],
};

const options = {
  plugins: {
    tooltip: {
      padding: 9,
      backgroundColor: "",
      titleMarginBottom: 12,
      bodyColor: "#fff", //color letras
      bodyFont: {
        size: 15,
      },
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || " ";
          if (label) {
            label = "  " + " ";
          }
          if (context.parsed.y !== null) {
            label = label + context.formattedValue + " %";
          }
          return label;
        },
      },
    },
    datalabels: {
      color: "blue",
      anchor: "end",
      align: "top",
      formatter: (value) => {
        return value + " %";
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grace: "50%",
    },
  },
};
</script>
