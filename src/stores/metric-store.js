import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { useAccessStore } from "src/stores/access-store";
import { useAdminStore } from "src/stores/admin-store";

export const useMetricStore = defineStore("metric", () => {
  const accessStore = useAccessStore();
  const adminStore = useAdminStore();

  const GraficoCiclos = ref([]);
  const GraficoUsuarios = ref([]);
  const GraficoIndicadores = ref([]);
  const GraficoCiclosIndicadores = ref([]);
  //const GraficoIndicadores2 = ref([]);

  const MetricaBoard = ref([]);

  //METRICAS
  const getAdminMetric = async () => {
    try {
      //console.log(adminStore.idTablero);
      const res = await api({
        method: "GET",
        url: `/admin/getMetric/${adminStore.idTablero}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });

      //console.log(res.data.cycles[0].ciclos);
      //console.log(res.data.indicators);
      //console.log(res.data.cycles_indicators);
      //console.log(res.data.users_indicators);

      /* console.log(res.data.indicator2);
      console.log(res.data.user[0].usuario_tableros); */

      /* GraficoIndicadores2.value = [...res.data.indicator2]; */
      GraficoCiclos.value = [...res.data.cycles[0].ciclos];
      GraficoIndicadores.value = [...res.data.indicators];
      GraficoCiclosIndicadores.value = [...res.data.cycles_indicators];
      GraficoUsuarios.value = [...res.data.users_indicators];

      /*GraficoUsuarios.value = [...res.data.user[0].usuario_tableros]; */

      MetricaBoard.value = [...res.data.board];
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  return {
    MetricaBoard,
    GraficoCiclos,
    GraficoUsuarios,
    GraficoIndicadores,
    GraficoCiclosIndicadores,
    //GraficoIndicadores2,
    getAdminMetric,
  };
});
