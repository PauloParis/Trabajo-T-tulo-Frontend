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
    // Get reference to the original fit function
    const originalFit = ChartJS.legend.fit;

    // Override the fit function
    ChartJS.legend.fit = function fit() {
      // Call original function and bind scope in order to use `this` correctly inside it
      originalFit.bind(ChartJS.legend)();
      // Change the height as suggested in another answers
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
  /* plugin, */
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

/* unshift
$scope.labels.unshift('');
$scope.data[0].unshift(null); */
adminStore.Ciclo.unshift("");
adminStore.Felicidad.unshift(null);

const data = {
  labels: adminStore.Ciclo, // eje horizontal
  datasets: [
    {
      label: "Ciclos",
      //label: adminStore.Ciclo,
      data: adminStore.Felicidad, // eje vertical
      backgroundColor: "rgb(75, 192, 192, 0.4)", // color puntitos
      borderColor: "rgb(75, 192, 192)", // color linea
      //borderDash: [2], // linea segmentada
      //borderDashOffset: 0.0, // sabra dios
      //borderJoinStyle: "miter", // 'round'|'bevel'|'miter' // sabra dios
      borderWidth: 3, // ancho de la linea
      //clip: number|object|false , // sabra dios
      //drawActiveElementsOnTop: true, // nose
      //fill: true, //nose

      //hoverBackgroundColor: "rgb(20,106,107)", // cambia de color los puntos al pasar el mouse

      //hoverBorderColor: "#234432", // nose

      //pointBackgroundColor: "rgb(20,106,107)", // nose

      pointBorderWidth: 9, // ancho de los puntos

      //pointHitRadius: 1, //nose

      pointHoverRadius: 9, // lo que crece el punto de adentro al pasar el mouse
      //pointHoverBorderWidth: 6, // lo que crece el punto de afuera al pasar el mouse
      //pointRadius: 7, // ancho de los puntos
      //pointRotation: 1, // nose
      //pointStyle: "circle", // la forma de los puntos
      //borderSkipped: "middle",
      //tension: 0.1,
    },
  ],
};

// custom tooltip block

/* const getOrCreateTooltip = (ChartJS) => {
  let tooltipElement = ChartJS.canvas.parentNode.querySlector("div");
  if(!tooltipElement) {
    tooltipElement = document.createElement('div')

  }
};

const externalTooltipHandler = (context) => {
  const { ChartJS, Tooltip } = context;
  const tooltipElement = getOrCreateTooltip(ChartJS);
};
 */

const options = {
  /* responsive: true, */
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

      /* enabled: false,
      external: externalTooltipHandle */
      /* backgroundColor: "#452333", */
      //titleSpacing: 5,
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
      /* ticks: {
        padding: 30,
      }, */
    },
  },
};
</script>
