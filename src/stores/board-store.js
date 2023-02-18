import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { useAccessStore } from "src/stores/access-store";
import { useQuasar } from "quasar";
import socket from "src/stores/socket-store";

export const useBoardStore = defineStore("board", () => {
  const accessStore = useAccessStore();
  const $q = useQuasar();
  const notificacion = ref(false);
  //NO ES NECESARIO TRAERLO DE ACA --AREGLAR---
  const btncreate = ref(false);
  const btncyclecreate = ref(false);
  const btnindicatorcreate = ref(false);
  const btnviewindicator = ref(false);
  const btnviewinfouser = ref(false);
  const btnedit = ref(false);
  const btneditcycle = ref(false);
  const btndelete = ref(false);
  const btndeletecycle = ref(false);
  const btndeleteindicator = ref(false);
  const btndisassociate = ref(false);
  const btninvitar = ref(false);
  //
  const nameroom = ref(null);

  const MisTableros = ref([]);
  const TablerosInvitado = ref([]);
  const MisCiclos = ref([]);
  const MisIndicadores = ref([]);
  //const TablerosInvitados = ref(null);
  const NombreTablero = ref(null);
  const NombreCiclo = ref(null);
  const NombreIndicador = ref(null);
  const Semestre = ref(null);
  const Anio = ref(null);
  const Color = ref("#3b083b");

  //REVISAR
  const idTablero = ref(null);
  const idCiclo = ref(null);
  const idIndicador = ref(null);
  const fkCiclo = ref(null);

  const evaluacion = ref(null);
  const felicidadTablero = ref(null);

  const name = ref(null);
  const surname = ref(null);
  const typeuser = ref(null);
  const category = ref(null);
  const description = ref(null);

  const sendEmail = ref(null); //CAMBIAR NOMBRE

  const usuarios = ref(null); //TABLEROS
  const INDICADORESDISCONNET = ref([]);

  const oldURL = ref(null);
  const url = ref(null);
  //fuction

  //BIEN
  const createBoard = async () => {
    try {
      const res = await api({
        method: "POST",
        url: "/board/createboard",
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
        data: {
          nombre_tablero: NombreTablero.value,
          semestre: Semestre.value,
          color: Color.value,
        },
      });
      MisTableros.value.unshift(res.data.myboard);
      (NombreTablero.value = ""), (Anio.value = ""), (Semestre.value = "");
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  };
  //BIEN
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
      if (res.status === 200) {
        const msg = res.data.cycle;
        socket.emit("message", msg);
      }
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  };
  //BIEN
  const createIndicator = async (nombreIndicador, idCicle) => {
    try {
      const res = await api({
        method: "POST",
        url: `/indicator/createindicador/${idCicle}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
        data: {
          nombre_indicador: nombreIndicador,
        },
      });
      if (res.status === 200) {
        const msg = res.data.indicator;
        socket.emit("indicadores", msg);
      }
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  };
  //BIEN
  const getMyBoard = async () => {
    try {
      const res = await api({
        method: "GET",
        url: "/board/myboards",
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });
      MisTableros.value = [...res.data.board];
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };
  //BIEN
  const getguestBoards = async () => {
    try {
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
      console.log(error.response?.data || error);
    }
  };
  //BIEN
  const getCycles = async (idTablero) => {
    try {
      const res = await api({
        method: "GET",
        url: `/cycle/cycles/${idTablero}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });
      MisCiclos.value = [...res.data.cycle];
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };
  //BIEN
  const getIndicator = async (idciclo) => {
    try {
      const res = await api({
        method: "GET",
        url: `/indicator/indicators/${idciclo}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });
      MisIndicadores.value = [...res.data.indicator];
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };
  //BIEN
  const editBoard = async (data) => {
    try {
      const res = await api({
        method: "PUT",
        url: `/board/updateboard/${data.ID_Tablero}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
        data: {
          nombre_tablero: data.Nombre_Tablero,
          anio: data.Anio,
          semestre: data.Semestre,
          color: data.Color,
        },
      });

      MisTableros.value = MisTableros.value.map((item) =>
        item.ID_Tablero === data.ID_Tablero ? res.data.myboard : item
      );
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };
  //BIEN
  const editCycle = async (data) => {
    try {
      const res = await api({
        method: "PUT",
        url: `/cycle/updatecycle/${data.ID_Ciclo}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
        data: {
          nombre_ciclo: data.Nombre_Ciclo,
        },
      });
      MisCiclos.value = MisCiclos.value.map((item) =>
        item.ID_Ciclo === data.ID_Ciclo ? data : item
      );

      if (res.status == 200) {
        const edit = res.data.cycles;
        socket.emit("editarCiclo", edit);
      }
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };
  //BIEN
  const deleteBoard = async (id) => {
    try {
      $q.loading.show();
      const res = await api({
        method: "DELETE",
        url: `/board/deleteboard/${id}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });

      MisTableros.value = MisTableros.value.filter(
        (item) => item.ID_Tablero !== idTablero.value
      );
    } catch (error) {
      console.log(error.response?.data || error);
    } finally {
      $q.loading.hide();
    }
  };
  //BIEN
  const deleteCycle = async (id) => {
    try {
      $q.loading.show();
      const res = await api({
        method: "DELETE",
        url: `/cycle/deletecycle/${id}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });

      if (res.status == 200) {
        MisCiclos.value = MisCiclos.value.filter(
          (item) => item.ID_Ciclo !== idCiclo.value
        );
        const remove = MisCiclos.value;
        socket.emit("eliminarCiclo", remove);
      }
    } catch (error) {
      console.log(error.response?.data || error);
    } finally {
      $q.loading.hide();
    }
  };
  //BIEN
  const deleteIndicator = async (id) => {
    try {
      $q.loading.show();
      const res = await api({
        method: "DELETE",
        url: `/indicator/deleteindicator/${id}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });

      if (res.status == 200) {
        MisIndicadores.value = MisIndicadores.value.filter(
          (item) => item.ID_Indicador !== idIndicador.value
        );
        const remove = MisIndicadores.value;
        socket.emit("eliminarIndicador", remove);
      }
    } catch (error) {
      console.log(error.response?.data || error);
    } finally {
      $q.loading.hide();
    }
  };
  //BIEN
  const disassociateBoard = async (id) => {
    try {
      const res = await api({
        method: "DELETE",
        url: `/board/disconnectboard/${id}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });
      TablerosInvitado.value = TablerosInvitado.value.filter(
        (item) => item.ID_Tablero !== idTablero.value
      );
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };
  //BIEN
  const saveEvaluation = async (evaluation, idindicador) => {
    try {
      const res = await api({
        method: "POST",
        url: `/indicator/evaluation/${idindicador}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
        data: {
          evaluacion: evaluation,
        },
      });
      if (res.status === 200) {
        return (notificacion.value = "ok");
        /*$q.notify({
          type: "Positive",
          message: "Se realizó la evaluación Correctamente",
        });*/
      }
      //evaluacion.value = "";
    } catch (error) {
      return (notificacion.value = "notok");
      /*$q.notify({
        type: "negative",
        message: error.response.data.error,
      });*/
      console.log(error.response?.data || error);
    }
  };
  //BIEN
  const deleteEvaluation = async (idindicador) => {
    try {
      const res = await api({
        method: "DELETE",
        url: `/indicator/deleteevaluation/${idindicador}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });
      if (res.status === 200) {
        return (notificacion.value = "ok");
        /*$q.notify({
          type: "positive",
          message: "Se Eliminó la evaluación Correctamente",
        });*/
      }
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };
  //BIEN
  const happyCycle = async (data) => {
    try {
      const res = await api({
        method: "PUT",
        url: `/evaluation/savehappycycle/${data.ID_Ciclo}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });

      MisCiclos.value = MisCiclos.value.map((item) =>
        item.ID_Ciclo === data.ID_Ciclo ? data : item
      );

      if (res.status == 200) {
        const happyciclo = res.data.traerCiclo;
        socket.emit("felicidadCiclo", happyciclo);
      }
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };
  //BIEN
  const happyBoard = async (idboard) => {
    try {
      const res = await api({
        method: "PUT",
        url: `/evaluation/savehappyboard/${idboard}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });

      felicidadTablero.value = res.data.traerTablero.Felicidad_Tablero;

      if (res.status == 200) {
        const happytablero = res.data.traerTablero.Felicidad_Tablero;
        socket.emit("felicidadTablero", happytablero);
      }
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };
  //BIEN
  const happyIndicator = async (idindicador) => {
    try {
      const res = await api({
        method: "PUT",
        url: `/evaluation/savehappyindicator/${idindicador}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };
  //BIEN
  const happyUser = async (idtablero) => {
    try {
      console.log("Entro al happyuser");
      const res = await api({
        method: "PUT",
        url: `/evaluation/savehappyuser/${idtablero}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };
  //BIEN
  const invitationBoard = async (Email, idboard) => {
    try {
      const res = await api({
        method: "POST",
        url: `/board/invitationboard/${idboard}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
        data: {
          email: Email,
        },
      });

      console.log("xxxx", res.data.userbuscar);

      if (res.status === 200) {
        const user = res.data.userbuscar;
        socket.emit("usuarios", user);
        sendEmail.value = "";
        $q.notify({
          type: "positive",
          message: "Se Invito el Usuario con Exito",
        });
      }
    } catch (error) {
      $q.notify({
        type: "negative",
        message: error.response?.data.error,
      });
      console.log(error.response?.data || error);
    }
  };

  //TABLEROS
  const getUsers = async (idboard) => {
    try {
      const res = await api({
        method: "GET",
        url: `/board/getUsers/${idboard}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });

      usuarios.value = [...res.data.traerusuarios];
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  };

  const getIndicatorsdisconnect = async (idtablero) => {
    try {
      const res = await api({
        method: "GET",
        url: `/board/getindicatorsdesconnect/${idtablero}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });
      console.log(res.data.indicatores);
      INDICADORESDISCONNET.value = [...res.data.indicatores];
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  //getMyBoard();
  return {
    createBoard,
    createCycle,
    createIndicator,
    MisTableros,
    TablerosInvitado,
    MisCiclos,
    MisIndicadores,
    getMyBoard,
    getCycles,
    getIndicator,
    editBoard,
    editCycle,
    deleteBoard,
    deleteCycle,
    deleteIndicator,
    deleteEvaluation,
    getguestBoards,
    disassociateBoard,
    saveEvaluation,
    invitationBoard,
    NombreTablero,
    NombreCiclo,
    NombreIndicador,
    Semestre,
    Anio,
    Color,
    idTablero,
    idCiclo,
    idIndicador,
    fkCiclo,
    btncreate,
    btncyclecreate,
    btnindicatorcreate,
    btnviewindicator,
    btnviewinfouser,
    btnedit,
    btneditcycle,
    btndelete,
    btndeletecycle,
    btndeleteindicator,
    btninvitar,
    btndisassociate,
    nameroom,
    evaluacion,
    felicidadTablero,
    happyCycle,
    happyBoard,
    happyIndicator,
    happyUser,
    name,
    surname,
    typeuser,
    category,
    description,
    sendEmail, //cambiar nombre
    //getBoards,
    //gestionTablero,
    getUsers,
    usuarios,
    getIndicatorsdisconnect,
    INDICADORESDISCONNET,
    oldURL,
    url,
    notificacion,
  };
});
