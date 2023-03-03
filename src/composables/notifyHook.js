import { useQuasar } from "quasar";

export const useNotify = () => {
  const $q = useQuasar();

  const successNotify = (message = "Exito") => {
    $q.notify({
      message,
      type: "positive",
    });
  };

  const errorNotify = (message = "Error de servidor") => {
    $q.notify({
      message,
      type: "negative",
    });
  };

  return { successNotify, errorNotify };
};
