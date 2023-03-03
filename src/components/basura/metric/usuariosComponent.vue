<template>
  <div id="container">
    <DoughnutChart :chartData="testData" />
  </div>
</template>
<script>
import { DoughnutChart } from "vue-chart-3";
import { useAdminStore } from "src/stores/admin-store";

const adminStore = useAdminStore();

for (let happy = 0; happy < adminStore.GraficoUsuarios.length; happy++) {
  adminStore.Felicidad.push(
    adminStore.GraficoUsuarios[happy].Felicidad_Usuario
  );

  const name = adminStore.GraficoUsuarios[happy].usuario.Nombre_Usuario;
  const surname = adminStore.GraficoUsuarios[happy].usuario.Apellido;
  var nombres = name + surname;
  console.log("en el for", nombres);
  adminStore.Usuario.push(nombres);
}

//here using vue-chart-3
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
export default {
  components: { DoughnutChart },
  setup() {
    const testData = {
      labels: adminStore.Usuario,
      colors: "red",
      datasets: [
        {
          label: "my data",
          data: adminStore.Felicidad,
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
          ],
          borderColor: "#fff",
          hoverOffset: 4,
          donutWidth: 60,
        },
      ],
    };
    return { testData };
  },
};
</script>
