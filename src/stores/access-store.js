import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export const useAccessStore = defineStore("access", () => {
  const token = ref(null);
  const expiresIn = ref(null);
  const idUsuario = ref(null);
  const typeuser = ref(null);
  const NombreUsuario = ref(null);
  const Apellido = ref(null);
  const Pais = ref(null);
  const Correo = ref(null);
  const Descripcion = ref(null);
  const PasswordActual = ref(null);
  const PasswordNueva = ref(null);
  const RePassword = ref(null);

  //BIEN
  const access = async (email, password) => {
    try {
      const res = await api.post("/auth/login", {
        email: email,
        password: password,
      });
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      typeuser.value = res.data.typeuser;

      if (typeuser.value === "Administrador") {
        //sessionStorage.setItem("user", true);
        sessionStorage.setItem("admin", true);
      }
      sessionStorage.setItem("user", true);
      setTime();
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
  const register = async (
    nombre_usuario,
    apellido,
    pais,
    email,
    password,
    repassword
  ) => {
    try {
      const res = await api.post("/auth/register", {
        nombre_usuario: nombre_usuario,
        apellido: apellido,
        pais: pais,
        email: email,
        password: password,
        repassword: repassword,
      });
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
  const logout = async () => {
    try {
      await api.get("/auth/logout");
    } catch (error) {
      console.log(error);
    } finally {
      resetStore();
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("admin");
    }
  };
  //BIEN
  const setTime = () => {
    setTimeout(() => {
      refreshToken();
    }, expiresIn.value * 1000 - 5000); //5 segundos antes
  };
  //BIEN
  const refreshToken = async () => {
    try {
      const res = await api.get("/auth/refresh");
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      sessionStorage.setItem("user", true);
      setTime();
    } catch (error) {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("admin");
    }
  };
  //BIEN
  const resetStore = () => {
    token.value = null;
    expiresIn.value = null;
  };
  //BIEN
  const getInfoUser = async () => {
    try {
      const res = await api({
        method: "GET",
        url: "/auth/protected",
        headers: {
          Authorization: "Bearer " + token.value,
        },
      });
      idUsuario.value = res.data.id;
      NombreUsuario.value = res.data.nombre;
      Apellido.value = res.data.apellido;
      Pais.value = res.data.pais;
      Correo.value = res.data.email;
      typeuser.value = res.data.usuario_tipo;
      Descripcion.value = res.data.descripcion;
    } catch (error) {
      console.log(error);
    }
  };
  //BIEN
  const editInfoUser = async () => {
    try {
      const res = await api({
        method: "PUT",
        url: "/auth/saveupdateuser",
        headers: {
          Authorization: "Bearer " + token.value,
        },
        data: {
          //traer del editUser.vue
          nombre_usuario: NombreUsuario.value,
          apellido: Apellido.value,
          pais: Pais.value,
          descripcion: Descripcion.value,
        },
      });
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
  const editPassUser = async () => {
    try {
      const res = await api({
        method: "PUT",
        url: "/auth/updatepassword",
        headers: {
          Authorization: "Bearer " + token.value,
        },
        data: {
          //traer del editPassword.vue
          password_actual: PasswordActual.value,
          password_nueva: PasswordNueva.value,
          repassword: RePassword.value,
        },
      });
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
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  };

  return {
    token,
    expiresIn,
    typeuser,
    access,
    register,
    refreshToken,
    logout,
    getInfoUser,
    editInfoUser,
    editPassUser,
    deleteUser,
    idUsuario,
    NombreUsuario,
    Apellido,
    Pais,
    Correo,
    Descripcion,
    PasswordActual,
    PasswordNueva,
    RePassword,
    //NomApe,
    //nom,
    //ape,
  };
});
