<template>
  <div>
    <Bar :data="data_bar" :options="options"></Bar>
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  BarElement,
  Title,
  Filler,
} from "chart.js";
import { useMetricStore } from "src/stores/metric-store.js";
import { ref } from "vue";
import { Bar } from "vue-chartjs";
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
  CategoryScale,
  LinearScale,
  Tooltip,
  BarElement,
  Title,
  Legend,
  ChartDataLabels,
  plugin,
  Filler
);

const metricStore = useMetricStore();

const borderColor = [
  "",

  "rgb(54, 162, 235)" /* azul tirado a celeste oscuro */,
  "rgb(255, 99, 132)" /* rojo tirado a rosado */,
  "rgb(75, 192, 192)" /* verde raro, medio azulado */,
  "rgb(255, 159, 64)" /* naranjo */,
  "rgb(153, 102, 255)" /* morado */,
  "rgb(255, 205, 86)" /* amarillo */,
  "rgb(102,255,179)" /* verde agua */,
  "rgb(255,102,255)" /* fuccia */,
  "rgb(153,255,255)" /* celeste agua */,
  "rgb(201, 203, 207)" /* gris */,
];

const backgroundColor = [
  "",
  "rgb(54, 162, 235, 0.4)",
  "rgb(255, 99, 132, 0.4)",
  "rgb(75, 192, 192, 0.4)",
  "rgb(255, 159, 64, 0.4)",
  "rgb(153, 102, 255, 0.4)",
  "rgb(255, 205, 86, 0.4)",
  "rgb(102, 255, 179, 0.4)",
  "rgb(255, 102,255, 0.4)",
  "rgb(153,255,255, 0.4)",
  "rgb(201, 203, 207, 0.4)",
];

const nombreIndicadores = ref([]);

for (let i = 0; i < metricStore.GraficoIndicadores.length; i++) {
  nombreIndicadores.value.push(
    metricStore.GraficoIndicadores[i].Nombre_Indicador
  );
}

const result = ref([]);

for (let j = 0; j < metricStore.GraficoCiclosIndicadores.length; j++) {
  let objeto = {
    label: null,
    data: [],
    fill: true,
    backgroundColor: backgroundColor[j + 1],
    borderColor: borderColor[j + 1],
    borderWidth: 2,
  };
  objeto.label = metricStore.GraficoCiclosIndicadores[j].Nombre_Ciclo;
  for (
    let x = 0;
    x < metricStore.GraficoCiclosIndicadores[j].ciclo_indicadors.length;
    x++
  ) {
    objeto.data.push(
      metricStore.GraficoCiclosIndicadores[j].ciclo_indicadors[x]
        .Felicidad_Indicador
    );
  }
  result.value.push(objeto);
}

const data_bar = {
  labels: nombreIndicadores.value,
  datasets: result.value,
};

const options = {
  plugins: {
    datalabels: {
      color: "blue",
      anchor: "end",
      align: "top",
      formatter: (value) => {
        return value + " %";
      },
    },
    tooltip: {
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
  },
  scales: {
    y: {
      beginAtZero: true,
      //min: 0,
      //max: 100,
      grace: "50%",
    },
  },
};
</script>
