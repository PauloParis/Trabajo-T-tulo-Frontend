import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { Loading } from "quasar";

export const useAccessStore = defineStore("access", () => {
  const token = ref(null);
  const expiresIn = ref(null);
  const infoUsuario = ref({
    idUsuario: null,
    NombreUsuario: null,
    Apellido: null,
    Pais: null,
    Email: null,
    TipoUsuario: null,
    Descripcion: null,
  });
  const password = ref({
    PasswordActual: null,
    PasswordNueva: null,
    RePassword: null,
  });
  const notificacion = ref([]);

  // Login
  const access = async (email, password) => {
    try {
      const res = await api.post("/auth/login", {
        email: email,
        password: password,
      });

      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      infoUsuario.value.TipoUsuario = res.data.typeuser;

      if (infoUsuario.value.TipoUsuario === "Administrador") {
        sessionStorage.setItem("admin", true);
      }
      sessionStorage.setItem("user", true);
      setTime();
    } catch (error) {
      throw error.response?.data.error || error;
    }
  };

  // register
  const register = async (
    nombre_usuario,
    apellido,
    pais,
    email,
    password,
    repassword
  ) => {
    try {
      await api.post("/auth/register", {
        nombre_usuario: nombre_usuario,
        apellido: apellido,
        pais: pais,
        email: email,
        password: password,
        repassword: repassword,
      });
    } catch (error) {
      throw error.response?.data.error || error;
    }
  };

  // logout
  const logout = async () => {
    try {
      await api.get("/auth/logout");
    } catch (error) {
      throw error;
    } finally {
      resetStore();
    }
  };

  // refrescar el token
  const setTime = () => {
    setTimeout(() => {
      refreshToken();
    }, expiresIn.value * 1000 - 5000); //5 segundos antes
  };

  // persistencia del usuario
  const refreshToken = async () => {
    try {
      const res = await api.get("/auth/refresh");
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      sessionStorage.setItem("user", true);
      if (res.data.typeUser.Tipo_Usuario === "Administrador") {
        sessionStorage.setItem("admin", true);
      }
      setTime();
    } catch (error) {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("admin");
    }
  };

  // remover token
  const resetStore = () => {
    token.value = null;
    expiresIn.value = null;
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("admin");
    localStorage.removeItem("keyuser");
    localStorage.removeItem("happyboard");
    localStorage.removeItem("board");
    localStorage.removeItem("keyboard");
  };

  // traer información del usuario logueado
  const getInfoUser = async () => {
    try {
      Loading.show();
      const res = await api({
        method: "GET",
        url: "/auth/protected",
        headers: {
          Authorization: "Bearer " + token.value,
        },
      });

      infoUsuario.value = {
        idUsuario: res.data.user[0].ID_Usuario,
        NombreUsuario: res.data.user[0].Nombre_Usuario,
        Apellido: res.data.user[0].Apellido,
        Pais: res.data.user[0].Pais,
        Email: res.data.user[0].Email,
        TipoUsuario: res.data.user[0].Tipo_Usuario,
        Descripcion: res.data.user[0].Descripcion,
      };
      notificacion.value = res.data.user[0].usuario_tableros;
    } catch (error) {
      throw error.response?.data.error || error;
    } finally {
      Loading.hide();
    }
  };

  // editar información del usuario
  const editInfoUser = async () => {
    try {
      const res = await api({
        method: "PUT",
        url: "/auth/saveupdateuser",
        headers: {
          Authorization: "Bearer " + token.value,
        },
        data: {
          nombre_usuario: infoUsuario.value.NombreUsuario,
          apellido: infoUsuario.value.Apellido,
          pais: infoUsuario.value.Pais,
          descripcion: infoUsuario.value.Descripcion,
        },
      });
    } catch (error) {
      throw error.response?.data.error || error;
    }
  };

  // editar la contraseña del usuario logueado
  const editPassUser = async () => {
    try {
      const res = await api({
        method: "PUT",
        url: "/auth/updatepassword",
        headers: {
          Authorization: "Bearer " + token.value,
        },
        data: {
          password_actual: password.value.PasswordActual,
          password_nueva: password.value.PasswordNueva,
          repassword: password.value.RePassword,
        },
      });
    } catch (error) {
      throw error.response?.data.error || error;
    }
  };

  // eliminar cuenta
  const deleteUser = async () => {
    try {
      await api({
        method: "DELETE",
        url: "auth/deleteaccount",
        headers: {
          Authorization: "Bearer " + token.value,
        },
      });
    } catch (error) {
      throw error.response?.data.error || error;
    }
  };

  return {
    token,
    expiresIn,
    password,
    infoUsuario,
    notificacion,

    access,
    register,
    refreshToken,
    logout,
    getInfoUser,
    editInfoUser,
    editPassUser,
    deleteUser,
  };
});
