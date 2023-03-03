import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { useAccessStore } from "src/stores/access-store";

export const useAdminStore = defineStore("admin", () => {
  //const

  const accessStore = useAccessStore();

  //gestion de tableros
  const idTablero = ref(null);
  const nombreTablero = ref(null);
  const anio = ref(null);
  const semestre = ref(null);
  const color = ref(null);
  const usuariosTablero = ref([null]);
  const btnOpenUserInfo = ref(false);
  const idUser = ref(null);
  const nombreUser = ref(null);
  const apellidoUser = ref(null);
  const emailUser = ref(null);
  const paisUser = ref(null);
  const tipoUser = ref(null);
  const categoriaUser = ref(null);
  const descripcionUser = ref(null);
  const felicidadTablero = ref(null);

  //gestion de usuarios
  const idUsuario = ref(null);
  const tipoUsuario = ref(null);
  const GestionUsuario = ref([]);

  //
  const Felicidad = ref([]); //iclo
  const FelicidadIndicador = ref([]);
  const Ciclo = ref([]);
  const Indicador = ref([]);
  const NombreCiclo = ref([]);
  const Usuario = ref([]);

  const gestionTablero = ref([]); //ADMIN
  const idreq = ref(null);

  const btnedit = ref(false);
  //fuction

  //TRAIGO TABLEROS
  const getBoards = async () => {
    try {
      const res = await api({
        method: "GET",
        url: `/admin/allBoard`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });
      //gestionTablero.value = null;

      gestionTablero.value = [...res.data.Boards];
      idreq.value = accessStore.idUsuario;
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };
  const getUserBoard = async (idtablero) => {
    try {
      const res = await api({
        method: "GET",
        url: `admin/usersBoard/${idtablero}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });

      usuariosTablero.value = [...res.data.usersBoard];
      console.log(usuariosTablero.value);
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };
  //EDITO TABLEROS
  const editAdminBoard = async () => {
    try {
      const res = await api({
        method: "PUT",
        url: `/board/updateboard/${idTablero.value}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
        data: {
          nombre_tablero: nombreTablero.value,
          anio: anio.value,
          semestre: semestre.value,
          color: color.value,
        },
      });
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  //TRAIGO USUARIOS
  const getAdminUsers = async () => {
    try {
      const res = await api({
        method: "GET",
        url: `/admin/allusers`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });
      GestionUsuario.value = [...res.data.users];
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };
  //EDITO USUARIOS
  const editAdminTypeUser = async (type) => {
    try {
      const res = await api({
        method: "PUT",
        url: `/admin/typeuser/${idUsuario.value}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
        data: {
          tipo_usuario: type,
        },
      });
      tipoUsuario.value = res.data.usertype.Tipo_Usuario;
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  return {
    idTablero,
    nombreTablero,
    anio,
    semestre,
    color,
    felicidadTablero,
    editAdminBoard,
    getAdminUsers,
    idUsuario,
    tipoUsuario,
    GestionUsuario,
    editAdminTypeUser,

    Felicidad,
    FelicidadIndicador,
    Ciclo,
    Indicador,
    Usuario,
    NombreCiclo,

    gestionTablero,
    getBoards,
    getUserBoard,
    usuariosTablero,
    btnOpenUserInfo,

    btnedit,

    idUser,
    nombreUser,
    apellidoUser,
    emailUser,
    paisUser,
    tipoUser,
    categoriaUser,
    descripcionUser,

    idreq,
  };
});
