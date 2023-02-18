<template>
  <div class="">
    <q-dialog v-model="boardStore.btnviewinfouser" persistent>
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">Información Usuario</div>
          <q-separator></q-separator>
        </q-card-section>

        <q-card-section>
          <div class="text-body1 text-weight-bold">Nombre:</div>
          <div class="text-body1 text-grey-14">
            {{ boardStore.name }} {{ boardStore.surname }}
          </div>
          <div class="text-body1 text-weight-bold">Tipo de Usuario:</div>
          <div class="text-body1 text-grey-14">{{ boardStore.typeuser }}</div>
          <div class="text-body1 text-weight-bold">Categoria:</div>
          <div class="text-body1 text-grey-14">{{ boardStore.category }}</div>
          <div class="text-body1 text-weight-bold">Descripción:</div>
          <div class="col col-md-6 text-body1 text-grey-14">
            <q-card flat bordered style="max-width: 30rem; min-height: 5rem">
              <q-card-section v-html="boardStore.description" />
            </q-card>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="ok" v-close-popup></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useBoardStore } from "src/stores/board-store";

const boardStore = useBoardStore();
</script>
