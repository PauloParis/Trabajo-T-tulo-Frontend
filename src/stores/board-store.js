import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { useAccessStore } from "src/stores/access-store";
import { useAdminStore } from "src/stores/admin-store";
/* import socket from "src/stores/socket-store"; */
import { Loading } from "quasar";

export const useBoardStore = defineStore("board", () => {
  const accessStore = useAccessStore();
  const adminStore = useAdminStore();
  /* const $q = useQuasar(); */

  const infoTablero = ref({
    IdTablero: null,
    NombreTablero: null,
    Semestre: null,
    Anio: null,
    Color: "#b2b2b2",
  });
  const infoCiclo = ref({
    IdCiclo: null,
    NombreCiclo: null,
  });
  const infoIndicador = ref({
    IdIndicador: null,
    NombreIndicador: null,
  });

  const openDialogCreateBoard = ref(false); // crear tablero
  const openDialogCreate = ref(false); // crear ciclo o indicador
  const openDialogEditDelete = ref(false); // editar indicador
  const openDialogEditBoard = ref(false); // editar tablero
  const openDialogEditCycle = ref(false); // editar ciclo
  const openDialogDelete = ref(null); // eliminar tablero, ciclo o indicador
  const openDialogDisassociate = ref(null); // desvincularse de un tablero
  const openDialogInvite = ref(null); // agregar un usuario a tablero

  const MisTableros = ref([]);
  const TablerosInvitado = ref([]);
  const MisCiclos = ref([]);
  const MisIndicadores = ref([]);
  const usuarios = ref(null); // users del conectados del tablero - socket

  const felicidadTablero = ref(null);

  const Titulo = ref(null);
  const TituloDelete = ref(null);

  // crear tablero
  const createBoard = async () => {
    try {
      const res = await api({
        method: "POST",
        url: "/board/createboard",
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
        data: {
          nombre_tablero: infoTablero.value.NombreTablero,
          semestre: infoTablero.value.Semestre,
          color: infoTablero.value.Color,
        },
      });
      MisTableros.value.unshift(res.data.myboard);
    } catch (error) {
      console.log(error);
      throw error.response?.data.error || error;
    }
  };

  // crear ciclo - socket
  const createCycle = async (nombreCiclo, idTablero) => {
    try {
      const res = await api({
        method: "POST",
        url: `/cycle/createcycle/${idTablero}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
        data: {
          nombre_ciclo: nombreCiclo,
        },
      });

      const status = res.status;
      const ciclo = res.data.cycle;

      return { status, ciclo };
    } catch (error) {
      throw error.response?.data.error || error;
    }
  };

  // crear indicador - socket
  const createIndicator = async (nombreIndicador, idboard) => {
    try {
      const res = await api({
        method: "POST",
        url: `/indicator/createindicador/${idboard}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
        data: {
          nombre_indicador: nombreIndicador,
        },
      });

      const status = res.status;
      const indicador = res.data.indicator;
      return { status, indicador };
    } catch (error) {
      throw error.response?.data.error || error;
    }
  };

  // traer mis tableros
  const getMyBoard = async () => {
    try {
      Loading.show();
      const res = await api({
        method: "GET",
        url: "/board/myboards",
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });
      MisTableros.value = [...res.data.board];
    } catch (error) {
      throw error.response?.data.error || error;
    } finally {
      Loading.hide();
    }
  };

  // traer tableros donde soy invitado
  const getguestBoards = async () => {
    try {
      Loading.show();
      const res = await api({
        method: "GET",
        url: "/board/guestboards",
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });
      TablerosInvitado.value = [...res.data.board];
      TablerosInvitado.value.reverse();
    } catch (error) {
      throw error.response?.data.error || error;
    } finally {
      Loading.hide();
    }
  };

  // traer ciclos
  const getCycles = async (idTablero) => {
    try {
      Loading.show();
      const res = await api({
        method: "GET",
        url: `/cycle/cycles/${idTablero}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });

      localStorage.setItem("happyboard", res.data.board.Felicidad_Tablero);
      felicidadTablero.value = localStorage.getItem("happyboard");
      MisCiclos.value = [...res.data.cycle];
    } catch (error) {
      throw error.response?.data.error || error;
    } finally {
      Loading.hide();
    }
  };

  // traer indicadores
  const getIndicator = async (idtablero) => {
    try {
      Loading.show();
      const res = await api({
        method: "GET",
        url: `/indicator/indicators/${idtablero}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });
      MisIndicadores.value = [...res.data.indicator];
    } catch (error) {
      throw error.response?.data.error || error;
    } finally {
      Loading.hide();
    }
  };

  // editar datos del tablero
  const editBoard = async () => {
    try {
      const res = await api({
        method: "PUT",
        url: `/board/updateboard/${infoTablero.value.IdTablero}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
        data: {
          nombre_tablero: infoTablero.value.NombreTablero,
          anio: infoTablero.value.Anio,
          semestre: infoTablero.value.Semestre,
          color: infoTablero.value.Color,
        },
      });

      MisTableros.value = MisTableros.value.map((item) =>
        item.ID_Tablero === infoTablero.value.IdTablero
          ? res.data.myboard
          : item
      );
    } catch (error) {
      throw error.response?.data.error || error;
    }
  };

  // editar ciclo - socket
  const editCycle = async () => {
    try {
      const res = await api({
        method: "PUT",
        url: `/cycle/updatecycle/${infoCiclo.value.IdCiclo}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
        data: {
          nombre_ciclo: infoCiclo.value.NombreCiclo,
        },
      });

      const status = res.status;
      const ciclo = res.data.cycle;

      return { status, ciclo };
    } catch (error) {
      throw error.response?.data.error || error;
    }
  };

  // editar indicador -socket
  const editIndicator = async () => {
    try {
      const res = await api({
        method: "PUT",
        url: `/indicator/updateindicator/${infoIndicador.value.IdIndicador}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
        data: {
          nombre_indicador: infoIndicador.value.NombreIndicador,
        },
      });

      const status = res.status;
      const indicador = res.data.indicator;

      return { status, indicador };
    } catch (error) {
      throw error.response?.data.error || error;
    }
  };

  // Eliminar tablero
  const deleteBoard = async () => {
    try {
      await api({
        method: "DELETE",
        url: `/board/deleteboard/${infoTablero.value.IdTablero}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });

      MisTableros.value = MisTableros.value.filter(
        (item) => item.ID_Tablero !== infoTablero.value.IdTablero
      );
    } catch (error) {
      throw error.response?.data.error || error;
    }
  };

  // eliminar ciclo - socket
  const deleteCycle = async () => {
    try {
      const idt = localStorage.getItem("keyboard");
      const res = await api({
        method: "DELETE",
        url: `/cycle/deletecycle/${infoCiclo.value.IdCiclo}/${idt}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });

      localStorage.setItem("happyboard", res.data.board.Felicidad_Tablero);
      felicidadTablero.value = localStorage.getItem("happyboard");

      const status = res.status;

      return { status };
    } catch (error) {
      throw error.response?.data.error || error;
    }
  };

  // eliminar indicador - socket
  const deleteIndicator = async (id) => {
    try {
      const res = await api({
        method: "DELETE",
        url: `/indicator/deleteindicator/${id}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });

      MisIndicadores.value = MisIndicadores.value.filter(
        (item) => item.ID_Indicador !== infoIndicador.value.IdIndicador
      );

      localStorage.setItem("happyboard", res.data.board.Felicidad_Tablero);
      felicidadTablero.value = localStorage.getItem("happyboard");
      getCycles(localStorage.getItem("keyboard"));

      const status = res.status;

      return { status };
    } catch (error) {
      throw error.response?.data.error || error;
    }
  };

  // desvincular tablero
  const disassociateBoard = async (idUsuario) => {
    try {
      await api({
        method: "DELETE",
        url: `/board/disconnectboard/${infoTablero.value.IdTablero}/${idUsuario}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });

      TablerosInvitado.value = TablerosInvitado.value.filter(
        (item) => item.ID_Tablero !== infoTablero.value.IdTablero
      );

      adminStore.usuariosTablero = adminStore.usuariosTablero.filter(
        (item) => item?.ID_Usuario !== adminStore.usuarioInfo.id
      );
    } catch (error) {
      throw error.response?.data.error || error;
    }
  };

  // actualizar evaluación - socket
  const updateEvaluation = async (
    idevaluacion,
    evaluation,
    idindicador,
    idciclo,
    idtablero
  ) => {
    try {
      const res = await api({
        method: "PUT",
        url: `/indicator/evaluation/${idevaluacion}/${idtablero}/${idciclo}/${idindicador}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
        data: {
          evaluacion: evaluation,
        },
      });

      localStorage.setItem("happyboard", res.data.board.Felicidad_Tablero);
      felicidadTablero.value = localStorage.getItem("happyboard");
      getCycles(idtablero);

      const status = res.status;

      return { status };
    } catch (error) {
      throw error.response?.data.error || error;
    }
  };

  // eliminar evaluación - socket
  const deleteEvaluation = async (
    idevaluacion,
    idtablero,
    idciclo,
    idindicador
  ) => {
    try {
      const res = await api({
        method: "DELETE",
        url: `/indicator/deleteevaluation/${idevaluacion}/${idtablero}/${idciclo}/${idindicador}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });

      localStorage.setItem("happyboard", res.data.board.Felicidad_Tablero);
      felicidadTablero.value = localStorage.getItem("happyboard");
      getCycles(idtablero);

      const status = res.status;

      return { status };
    } catch (error) {
      throw error.response?.data.error || error;
    }
  };

  // agregar usuario a un tablero
  const invitationBoard = async (email, idboard) => {
    try {
      await api({
        method: "POST",
        url: `/board/invitationboard/${idboard}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
        data: {
          email: email,
        },
      });
    } catch (error) {
      throw error.response?.data.error || error;
    }
  };

  // usuarios conectados al tablero // socket
  const getInfoUserSocket = async (idboard) => {
    try {
      Loading.show();
      const res = await api({
        method: "GET",
        url: `/board/getInfoUserSocket/${idboard}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });

      return res.data.infoUser;
    } catch (error) {
      throw error.response?.error || error.message;
    } finally {
      Loading.hide();
    }
  };

  // notificación layout
  const updateNotify = async (idTablero) => {
    try {
      const res = await api({
        method: "PUT",
        url: `/board/updateNotify/${idTablero}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });

      if (res.status === 200) {
        accessStore.notificacion = accessStore.notificacion.filter(
          (item) => item.tablero.ID_Tablero !== idTablero
        );
      }
    } catch (error) {
      console.log(error.response?.data.error || error);
    }
  };

  return {
    createBoard,
    createCycle,
    createIndicator,
    getMyBoard,
    getCycles,
    getIndicator,
    editBoard,
    editCycle,
    editIndicator,
    deleteBoard,
    deleteCycle,
    deleteIndicator,
    deleteEvaluation,
    getguestBoards,
    disassociateBoard,
    invitationBoard,
    getInfoUserSocket,
    updateEvaluation,
    updateNotify,

    MisTableros,
    TablerosInvitado,
    MisCiclos,
    MisIndicadores,
    usuarios,

    openDialogCreateBoard,
    openDialogCreate,
    openDialogEditDelete,
    openDialogEditBoard,
    openDialogEditCycle,
    openDialogDelete,
    openDialogDisassociate,
    openDialogInvite,

    felicidadTablero,

    Titulo,
    TituloDelete,

    infoTablero,
    infoCiclo,
    infoIndicador,
  };
});
