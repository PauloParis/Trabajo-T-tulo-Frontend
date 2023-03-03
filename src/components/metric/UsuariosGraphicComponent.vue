<template>
  <div>
    <Radar :data="data_radar" :options="options"></Radar>
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  RadarController,
  CategoryScale,
  RadialLinearScale,
  Tooltip,
  Filler,
} from "chart.js";
import { Radar } from "vue-chartjs";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useMetricStore } from "src/stores/metric-store";
import { ref } from "vue";

ChartJS.register(
  RadarController,
  CategoryScale,
  RadialLinearScale,
  Tooltip,
  ChartDataLabels,
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
const result = ref([]);

for (let i = 0; i < metricStore.GraficoIndicadores.length; i++) {
  nombreIndicadores.value.push(
    metricStore.GraficoIndicadores[i].Nombre_Indicador
  );
}

for (let j = 0; j < metricStore.GraficoUsuarios.length; j++) {
  let objeto = {
    label: null,
    data: [],
    backgroundColor: backgroundColor[j + 1],
    borderColor: borderColor[j + 1],
    borderWidth: 2,
    fill: true,
    pointBorderWidth: 8,
    pointHoverRadius: 9,
  };
  objeto.label =
    metricStore.GraficoUsuarios[j].Nombre_Usuario +
    " " +
    metricStore.GraficoUsuarios[j].Apellido;
  for (
    let x = 0;
    x < metricStore.GraficoUsuarios[j].usuario_indicadors.length;
    x++
  ) {
    objeto.data.push(
      metricStore.GraficoUsuarios[j].usuario_indicadors[x].Felicidad_Usuario
    );
  }
  result.value.push(objeto);
}

const data_radar = {
  labels: nombreIndicadores.value,
  datasets: result.value,
};

/* const data = {
  labels: ["Drinking", "Sleeping", "ajajaj", "probando"],
  datasets: [
    {
      label: "My First Dataset",
      data: [90, 81, 65, 12],
      fill: true,
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgb(255, 99, 132)",
      pointBackgroundColor: "rgb(255, 99, 132)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(255, 99, 132)",
    },
    {
      label: "My Second Dataset",
      data: [19, 100, 34],
      fill: true,
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgb(54, 162, 235)",
      pointBackgroundColor: "rgb(54, 162, 235)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(54, 162, 235)",
    },
  ],
}; */

const options = {
  plugins: {
    datalabels: {
      color: "blue",
      anchor: "end",
      align: "right",
      formatter: (value) => {
        /* https://blog.imind.jp/entry/2019/07/19/210646 */
        return "  " + value + " %";
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
    r: {
      beginAtZero: true,
      grace: "20%",
      pointLabels: {
        font: {
          size: 13,
        },
        padding: 20,
      },
    },
  },
  labels: {
    font: {
      size: 40,
    },
  },
  elements: {
    line: {
      borderWidth: 3,
    },
  },
};
</script>
