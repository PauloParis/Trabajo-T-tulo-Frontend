<!-- <template>
  <div>
    <Doughnut
      v-if="loaded"
      :chart-options="chartOptions"
      :chart-data="Data"
      :plugins="plugins"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script setup>
import { Doughnut } from "vue-chartjs";
import { Chart, ArcElement, DoughnutController } from "chart.js";
import { computed, ref } from "vue";
//import ChartDataLabels from "chartjs-plugin-datalabels";
import { useAdminStore } from "src/stores/admin-store";
import { useMetricStore } from "src/stores/metric-store";

Chart.register(DoughnutController, ArcElement);

const adminStore = useAdminStore();
const metricStore = useMetricStore();

const loaded = ref(true);

const width = ref({ type: Number, default: 300 });
const height = ref({
  type: Number,
  default: 300,
});

const felicidad = ref([]);
const usuario = ref([]);

for (let happy = 0; happy < metricStore.GraficoUsuarios.length; happy++) {
  felicidad.value.push(metricStore.GraficoUsuarios[happy].Felicidad_Usuario);

  const name = metricStore.GraficoUsuarios[happy].usuario.Nombre_Usuario;
  const surname = metricStore.GraficoUsuarios[happy].usuario.Apellido;
  var nombres = name + " " + surname;
  usuario.value.push(nombres);
}

const Data = computed(() => ({
  datasets: [
    {
      //labels: usuario.value,
      data: felicidad.value,
      backgroundColor: [
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
        "rgb(102,255,179)",
        "rgb(255,102,255)",
        "rgb(153,255,255)",
      ],
      borderColor: "rgba(0, 0, 0, 0.1)",
    },
  ],
  labels: usuario.value,
}));

const chartOptions = ref({
  plugins: {
    title: {
      display: true,
      text: "USUARIOS",
    },
  },
  aspectRatio: 4,
  /*datalabels: {
    anchor: "end",
    align: "top",
    formatter: Math.round,
    font: {
      weight: "bold",
      size: 20,
      color: "black",
    },
  },*/
  layout: {
    padding: {
      top: 32,
    },
  },
  legend: {
    display: true,
  },
  scales: {},
});
</script>
 -->
