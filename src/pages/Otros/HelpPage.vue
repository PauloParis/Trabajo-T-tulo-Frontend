<template>
  <q-page padding class="principal">
    <div class="q-pa-xs col-12">
      <label class="text-h4 text-blue-grey-14 text-weight-medium"
        >Sobre la Plataforma de Índice de Felicidad</label
      >
    </div>
    <q-separator></q-separator>
    <br />

    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      control-color="primary"
      class="rounded-borders"
    >
      <q-carousel-slide name="info" class="column no-wrap">
        <label class="text-h5 text-blue-grey-14"
          >¿Cúal es la Finalidad de la Plataforma?</label
        >
        <br />
        <br />
        <p class="text-body1">
          La Plataforma de índice de Felicidad, es un sistema que permite a los
          usuarios registrados generar Tableros (o Grupos de Trabajo), estos
          funcionarán como un ambiente de trabajo simultaneo entre un máximo de
          10 integrantes, en los cuales se podrá definir Ciclos (o Spring o
          Entregables), donde a su vez tambien se podrán definir indicadores,
          que podrán ser evaluados por los integrantes del Grupo.
        </p>
        <p class="text-body1">
          La evaluación realizada permitirá a los usuarios con tipo de cuenta
          'Administrador', acceder a los resultados, de forma que, se podrán
          realizar analisis, para mejorar la productividad de los equipos.
        </p>
      </q-carousel-slide>

      <q-carousel-slide name="account" class="column no-wrap">
        <label class="text-h5 text-blue-grey-14">Perfil</label>
        <br /><br />
        <p class="text-body1">
          En esta vista, se visualizará la información del usuario, como su
          nombre, apellido, país, correo y descripción, ademas del tipo de
          cuenta (Administrador o Estandar). Cabe destacar que la información de
          nombre, apellido, tipo de cuenta y descripción podrán ser vistos por
          otros usuarios, si forma parte de algún tablero.
        </p>
        <p class="text-body1">
          Dentro de las funcionalidades de esta vista, se encuentra la opción de
          "Editar Perfil", que permite modificar el nombre, apellido, pais o
          descripción. También se encuentra la opción de "Cambiar Contraseña",
          donde el usuario podrá modificar su contraseña.
        </p>
      </q-carousel-slide>

      <q-carousel-slide name="myboard" class="column no-wrap">
        <label class="text-h5 text-blue-grey-14">Mis Tableros</label>
        <br /><br />
        <p class="text-body1">
          En esta vista, se encuentra la lista de todos los tableros creados por
          el usuario. Cada tablero muestra el nombre, el año y el semestre al
          cual corresponde, además cada tablero, tendrá la opción de editar los
          datos de (nombre, año, semestre y color), como tambien la opción de
          eliminar dicho tablero.
        </p>
        <p class="text-body1">
          También esta vista contempla la opción de crear nuevos tableros,
          indicando su nombre, semestre y color de fondo.
        </p>
      </q-carousel-slide>

      <q-carousel-slide name="guestboard" class="column no-wrap">
        <label class="text-h5 text-blue-grey-14">Tableros Invitado</label><br />
        <br />
        <p class="text-body1">
          En esta vista, se encuenta la lista de tableros, en la cual el usuario
          pertence como invitado, mostrando información de nombre, año y
          semestre, el orden en que se mostrará esta lista, dependerá de la
          fecha en que el usuario fue invitado en dichos tablero. La opción que
          proporciona cada tablero es la de desvincularse, esto quiere decir que
          el usuario pierde relación con el tablero en el cual fue invitado.
        </p>
      </q-carousel-slide>

      <q-caousel-slide name="manageboard" class="column no-wrap q-pa-md">
        <label class="text-h5 text-blue-grey-14"
          >Gestor de Tableros (Solo si eres Administrador)</label
        ><br />
        <br />
        <p class="text-body1">
          En esta vista, se desplegaran todos los tableros a los que el ususario
          pertenezca, ya sea como creador o invitado. Al seleccionar un tablero
          de la lista, aparecerá la información del tablero (Nombre, Año,
          Semestre), la cual podrá ser editada, y donde también se podrá
          eliminar un tablero.
        </p>

        <p class="text-body1">
          Por lo que, un tablero solo puede ser eliminado por el creador del
          tablero, como tambíen por el usuario Administrador que forma parte de
          el.
        </p>
      </q-caousel-slide>

      <q-caousel-slide name="metric" class="column no-wrap q-pa-md">
        <label class="text-h5 text-blue-grey-14"
          >Métricas (Solo si eres Administrador)</label
        ><br />
        <br />
        <p class="text-body1">
          En esta vista, se desplegaran todos los tableros a los que el ususario
          pertenezca, ya sea como creador o invitado. Al seleccionar un tablero,
          se mostrará en forma de gráfica, los porcentajes de felicidad de 3
          grupos.
        </p>
        <p class="text-body1">
          En el primer grupo, al lado superior izquierdo, aparecerán los
          porcentajes de felicidad por ciclo del grupo, cabe mencionar que
          dentro de la gráfica aparecerán aquellos ciclos que tengan
          evaluaciones realizadas.
        </p>
        <p class="text-body1">
          En el segundo grupo, al lado superior derecho, aparecerán los
          porcentajes de felicidad por indicador del grupo, aqui se mostrarán
          todos los indicadores creados, en todos los ciclos del tablero, cabe
          mencionar que dentro de la gráfica aparecerán aquellos ciclos que
          tengan evaluaciones realizadas.
        </p>
        <p class="text-body1">
          En el tercer grupo, en la parte baja, aparecerán los porcetnajes de
          felicidad por ususario del grupo, cabe mencionar que dentro de la
          gráfica aparecerán aquellos usuarios que hayan realizado alguna
          evaluación.
        </p>
      </q-caousel-slide>

      <q-caousel-slide name="manageaccount" class="column no-wrap q-pa-md">
        <label class="text-h5 text-blue-grey-14"
          >Gestor de Cuentas (Solo si eres Administrador)</label
        ><br />
        <br />
        <p class="text-body1">
          En esta vista, se desplegan todos los usuarios del sistema, con
          información de nombre, apellido, país, email y tipo de usuario, al
          seleccionar un usuario, se podrá modificar los permisos que este
          tendrá en la plataforma, es decir, se puede cambiar el tipo de usuario
          (Adminsitrador - Estandar).
        </p>
      </q-caousel-slide>

      <q-caousel-slide name="setting" class="column no-wrap q-pa-md">
        <label class="text-h5 text-blue-grey-14">Configuraciones</label><br />
        <br />
        <p class="text-body1">
          En esta vista se encuentran las configuraciones que se podrán realizar
          de la cuenta de usuario. De momento la única opción de configuración
          es eliminar la propia cuenta del usuario, al realizar esta opción, se
          perderá toda la información del usuario, la cual, no podrá ser
          restaurada.
        </p>
      </q-caousel-slide>
    </q-carousel>
    <div class="row justify-center">
      <q-btn-toggle
        glossy
        v-model="slide"
        :options="[
          { label: 'Info', value: 'info' },
          { label: 'Perfil', value: 'account' },
          { label: 'Mis Tableros', value: 'myboard' },
          { label: 'Tableros Invitado', value: 'guestboard' },
          { label: 'Gestión Tableros', value: 'manageboard' },
          { label: 'Métricas', value: 'metric' },
          { label: 'Gestión Cuentas', value: 'manageaccount' },
          { label: 'Configuración', value: 'setting' },
        ]"
      />
    </div>
    <div class="q-pa-md"></div>
  </q-page>
</template>

<script setup>
import { ref } from "@vue/reactivity";

const slide = ref("info");
</script>

<style lang="scss" scoped>
.principal {
  background: url("src/assets/perfil.png");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
