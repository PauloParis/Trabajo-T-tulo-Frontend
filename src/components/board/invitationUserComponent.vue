<template>
  <div class="q-pa-md">
    <q-dialog v-model="boardStore.openDialogInvite" persistent>
      <q-card style="width: 400px">
        <div class="q-pa-md">
          <div class="text-h6">Invitar Usuario</div>
          <q-separator></q-separator>
        </div>

        <q-form class="q-pa-md" @submit.prevent="InvitarUsuario">
          <q-input
            v-model="email"
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
            <q-btn
              flat
              label="Cancelar"
              class="text-negative"
              @click="(email = ''), (boardStore.openDialog = false)"
              v-close-popup
            />
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
import { ref } from "vue";
import { useQuasar } from "quasar";

const boardStore = useBoardStore();
const { successNotify, errorNotify } = useNotify();
const $q = useQuasar();

const idtablero = localStorage.getItem("keyboard");
const email = ref("");

const InvitarUsuario = async () => {
  try {
    $q.loading.show();
    await boardStore.invitationBoard(email.value, idtablero);
    successNotify("El usuario fue invitado correctamente");
    email.value = "";
    boardStore.openDialog = false;
  } catch (error) {
    errorNotify(error);
  } finally {
    $q.loading.hide();
  }
};
</script>
