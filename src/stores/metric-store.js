import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { useAccessStore } from "src/stores/access-store";
import { useAdminStore } from "src/stores/admin-store";
import { Loading } from "quasar";

export const useMetricStore = defineStore("metric", () => {
  const accessStore = useAccessStore();
  const adminStore = useAdminStore();

  const GraficoCiclos = ref([]);
  const GraficoUsuarios = ref([]);
  const GraficoIndicadores = ref([]);
  const GraficoCiclosIndicadores = ref([]);

  const MetricaBoard = ref([]);

  // traer datos, para las métricas
  const getAdminMetric = async () => {
    try {
      Loading.show();
      const res = await api({
        method: "GET",
        url: `/admin/getMetric/${adminStore.infoTablero.IdTablero}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });

      GraficoCiclos.value = [...res.data.cycles[0].ciclos];
      GraficoIndicadores.value = [...res.data.indicators];
      GraficoCiclosIndicadores.value = [...res.data.cycles_indicators];
      GraficoUsuarios.value = [...res.data.users_indicators];

      MetricaBoard.value = [...res.data.board];
    } catch (error) {
      throw error.response?.data.error || error;
    } finally {
      Loading.hide();
    }
  };

  return {
    MetricaBoard,
    GraficoCiclos,
    GraficoUsuarios,
    GraficoIndicadores,
    GraficoCiclosIndicadores,
    getAdminMetric,
  };
});
