import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { useAccessStore } from "src/stores/access-store";
import { Loading } from "quasar";

export const useAdminStore = defineStore("admin", () => {
  const accessStore = useAccessStore();

  const infoTablero = ref({
    // manageBoard
    IdTablero: null,
    NombreTablero: null,
    Anio: null,
    Semestre: null,
    Color: null,
    FelicidadTablero: null,
  });
  const openDialogEditBoard = ref(false); // editar tablero
  const gestionTablero = ref([]); // tableros del usuario - manageBoard
  const usuariosTablero = ref([]); // usuarios del tablero - manageBoard

  const openDialogUserInfo = ref(false); // información del usuario - manageBoard

  const usuarioInfo = ref({
    // información del usuario - manageBoard
    id: null,
    name: null,
    surname: null,
    email: null,
    country: null,
    type: null,
    category: null,
    description: null,
  });

  const GestionUsuario = ref([]); // todos los usuarios - manageUser

  const infoManageUser = ref({
    IdUsuario: null,
    TipoUsuario: null,
  });

  const Felicidad = ref([]); //ciclo
  const FelicidadIndicador = ref([]);
  const Ciclo = ref([]);
  const Indicador = ref([]);
  const NombreCiclo = ref([]);
  const Usuario = ref([]);

  // traer tableros del usuario - manageBoard
  const getBoards = async () => {
    try {
      Loading.show();
      const res = await api({
        method: "GET",
        url: `/admin/allBoard`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });

      gestionTablero.value = [...res.data.Boards];
    } catch (error) {
      throw error.response?.data.error || error;
    } finally {
      Loading.hide();
    }
  };

  // traer usuarios del tablero seleccionado - manageBoard
  const getUserBoard = async (idtablero) => {
    try {
      Loading.show();
      const res = await api({
        method: "GET",
        url: `admin/usersBoard/${idtablero}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });

      usuariosTablero.value = [...res.data.usersBoard];
    } catch (error) {
      throw error.response?.data.error || error;
    } finally {
      Loading.hide();
    }
  };

  // editar tablero - manageBoard
  const editAdminBoard = async () => {
    try {
      await api({
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
    } catch (error) {
      throw error.response?.data.error || error;
    }
  };

  // cambiar categoria del usuario - manageBoard
  const changeCategory = async () => {
    try {
      const res = await api({
        method: "PUT",
        url: `/admin/changeCategory/${usuarioInfo.value.id}/${infoTablero.value.IdTablero}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
        data: {
          categoria: usuarioInfo.value.category,
        },
      });

      usuariosTablero.value = usuariosTablero.value.map((item) =>
        item.ID_Usuario === usuarioInfo.value.id ? res.data.userCategory : item
      );
    } catch (error) {
      throw error.response?.data.error || error;
    }
  };

  // traer a todos los usuarios menos el propio
  const getAdminUsers = async () => {
    try {
      Loading.show();
      const res = await api({
        method: "GET",
        url: `/admin/allusers`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
      });
      GestionUsuario.value = [...res.data.users];
    } catch (error) {
      throw error.response?.data.error || error;
    } finally {
      Loading.hide();
    }
  };

  // editar el tipo de usuario administrador - estandar
  const editAdminTypeUser = async () => {
    try {
      const res = await api({
        method: "PUT",
        url: `/admin/typeuser/${infoManageUser.value.IdUsuario}`,
        headers: {
          Authorization: "Bearer " + accessStore.token,
        },
        data: {
          tipo_usuario: infoManageUser.value.TipoUsuario,
        },
      });

      GestionUsuario.value = GestionUsuario.value.map((item) =>
        item.ID_Usuario === infoManageUser.value.IdUsuario
          ? res.data.user
          : item
      );
    } catch (error) {
      throw error.response?.data.error || error;
    }
  };

  return {
    infoTablero,
    openDialogEditBoard,
    gestionTablero,
    usuariosTablero,

    openDialogUserInfo,
    usuarioInfo,

    getBoards,
    getUserBoard,
    editAdminBoard,
    changeCategory,

    getAdminUsers, //user
    infoManageUser,

    GestionUsuario,
    editAdminTypeUser,

    Felicidad,
    FelicidadIndicador,
    Ciclo,
    Indicador,
    NombreCiclo,
    Usuario,
  };
});
