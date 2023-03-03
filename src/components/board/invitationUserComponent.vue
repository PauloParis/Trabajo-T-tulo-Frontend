<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="boardStore.btninvitar" persistent>
      <q-card style="min-width: 400px">
        <div class="q-pa-md">
          <div class="text-h6">Invitar Usuario</div>
          <q-separator></q-separator>
        </div>

        <q-form class="q-pa-md" @submit.prevent="InvitarUsuario">
          <q-input
            v-model="boardStore.sendEmail"
            label="Correo"
            placeholder="Ingrese Correo"
            :rules="[
              (val) =>
                (val && /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val)) ||
                'Formato email incorrecto',
            ]"
          />

          <br />
          <q-card-actions align="right" class="text-primary">
            <br />
            <q-btn flat label="Cancelar" class="text-negative" v-close-popup />
            <q-btn flat label="Invitar" type="submit" v-close-popup />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useBoardStore } from "src/stores/board-store";
import { useNotify } from "src/composables/notifyHook";
import { useRoute } from "vue-router";

const { successNotify, errorNotify } = useNotify();
const boardStore = useBoardStore();

const route = useRoute();
const idtablero = localStorage.getItem("keyboard");

const InvitarUsuario = async () => {
  try {
    const Email = boardStore.sendEmail;
    const res = await boardStore.invitationBoard(Email, idtablero);
    successNotify("El usuario fue invitado correctamente");
    boardStore.sendEmail = null;
  } catch (error) {
    errorNotify(error.error);
  }
};
</script>
