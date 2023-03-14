<template>
  <q-page padding class="principal">
    <div class="q-pa-xs col-12">
      <div class="text-h4 text-blue-grey-14 text-weight-medium">
        Sobre la Plataforma de Índice de Felicidad
      </div>
    </div>
    <q-separator></q-separator>
    <br />

    <q-carousel
      v-model="slideAdmin"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      control-color="primary"
      class="rounded-borders bordes"
    >
      <q-carousel-slide name="info" class="column no-wrap">
        <div class="text-h5 text-blue-grey-14">
          ¿Cúal es la Finalidad de la Plataforma?
        </div>
        <br />
        <br />
        <div class="text-body1">
          La Plataforma de índice de Felicidad, es un sistema que permite a los
          usuarios registrados generar Tableros (o Grupos de Trabajo), estos
          funcionarán como un ambiente de trabajo simultaneo entre un máximo de
          5 integrantes, en los cuales se podrá definir Ciclos (o Spring o
          Entregables), donde a su vez tambien se podrán definir indicadores,
          que podrán ser evaluados por los integrantes del Grupo.
        </div>
        <div class="text-body1">
          La evaluación realizada permitirá a los usuarios con tipo de cuenta
          'Administrador', acceder a los resultados, de forma que, se podrán
          realizar analisis, para mejorar la productividad de los equipos.
        </div>
      </q-carousel-slide>

      <q-caousel-slide name="manageboard" class="column no-wrap q-pa-md">
        <div class="text-h5 text-blue-grey-14">
          Gestor de Tableros (Solo si eres Administrador)
        </div>
        <br />
        <br />
        <div class="text-body1">
          En esta vista, se desplegaran todos los tableros a los que el ususario
          pertenezca, ya sea como creador o invitado. Al seleccionar un tablero
          de la lista, aparecerá la información del tablero (Nombre, Año,
          Semestre), la cual podrá ser editada, o eliminar dicho tablero.
          También, muestra a todos los integrantes pertenecientes al tablero, y
          donde el usuario administrador, podrá cambiar su categoria de Creador
          o Invitado y asi También desvincular a un usuario.
        </div>
        <div class="text-body1 text-negative">
          Ojo: si el usuario administrador, desvincula al "usuario Creador" se
          eliminará el tablero y toda su información. Por lo que, si se desea
          desvincular al usuario creador, ANTES se recomienda poner a otro
          integrante como "Creador".
        </div>
        <div class="text-body1">
          Por lo que, un tablero solo puede ser eliminado por el creador del
          tablero, como tambíen por el usuario Administrador que forma parte de
          el.
        </div>
      </q-caousel-slide>

      <q-caousel-slide name="metric" class="column no-wrap q-pa-md">
        <div class="text-h5 text-blue-grey-14">
          Métricas (Solo si eres Administrador)
        </div>
        <br />
        <br />
        <div class="text-body1">
          En esta vista, se desplegaran todos los tableros a los que el ususario
          pertenezca, ya sea como creador o invitado. Al seleccionar un tablero,
          se mostrarán 4 tarjetas con información.
        </div>
        <div class="text-body1">
          En la primera tarjeta, se muestra la información basica del tablero
          (nombre, año, y semestre), y en grande el porcentaje de felicidad
          total del grupo.
        </div>
        <div class="text-body1">
          En la segunda tarjeta, al lado superior derecho, aparecerán los
          porcentajes de felicidad por ciclo del grupo, cabe mencionar que
          dentro de la gráfica aparecerán aquellos ciclos que tengan
          evaluaciones realizadas.
        </div>
        <div class="text-body1">
          En la tercera tarjeta, aparecerán los porcentajes de felicidad por
          indicador del grupo en graficas de barra, aqui se mostrarán todos los
          indicadores creados, filtrados por ciclo y cuyos valores, representan
          el promedio realizado por todos los usuarios.
        </div>
        <div class="text-body1">
          En la última tarjeta, aparecerán los porcetnajes de felicidad por
          ususario del grupo, en gráfica de radar, aqui se mostrarán todos los
          usuarios que hayan realizado evaluaciones, filtrados por indicador.
        </div>
      </q-caousel-slide>

      <q-caousel-slide name="manageaccount" class="column no-wrap q-pa-md">
        <div class="text-h5 text-blue-grey-14">
          Gestor de Cuentas (Solo si eres Administrador)
        </div>
        <br />
        <br />
        <div class="text-body1">
          En esta vista, se desplegan todos los usuarios del sistema, menos el
          propio con información de nombre, apellido, país, email y tipo de
          usuario, al seleccionar un usuario, se podrá modificar los permisos
          que este tendrá en la plataforma, es decir, se puede cambiar el tipo
          de usuario (Adminsitrador - Estandar).
        </div>
      </q-caousel-slide>
    </q-carousel>

    <div class="row justify-center">
      <q-btn-toggle
        glossy
        v-model="slideAdmin"
        :options="[
          { label: 'Info', value: 'info' },
          { label: 'Gestión Tableros', value: 'manageboard' },
          { label: 'Métricas', value: 'metric' },
          { label: 'Gestión Cuentas', value: 'manageaccount' },
        ]"
      />
    </div>

    <br /><br /><br />

    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      control-color="primary"
      class="rounded-borders bordes"
    >
      <q-carousel-slide name="account" class="column no-wrap">
        <div class="text-h5 text-blue-grey-14">Perfil</div>
        <br />
        <div class="text-body1">
          En esta vista, se visualizará la información del usuario, como su
          nombre, apellido, país, correo y descripción, ademas del tipo de
          cuenta (Administrador o Estandar). Cabe destacar que la información de
          nombre, apellido, tipo de cuenta y descripción podrán ser vistos por
          otros usuarios, si forma parte de algún tablero.
        </div>
        <div class="text-body1">
          Dentro de las funcionalidades de esta vista, se encuentra la opción de
          "Editar Perfil", que permite modificar el nombre, apellido, pais o
          descripción. También se encuentra la opción de "Cambiar Contraseña",
          donde el usuario podrá modificar su contraseña.
        </div>
        <div class="text-h5 q-mt-md text-blue-grey-14">Configuraciones</div>
        <br />
        <div class="text-body1">
          En esta vista se encuentran las configuraciones que se podrán realizar
          de la cuenta de usuario. De momento la única opción de configuración
          es eliminar la propia cuenta del usuario, al realizar esta opción, se
          perderá toda la información del usuario, la cual, no podrá ser
          restaurada.
        </div>
      </q-carousel-slide>

      <q-carousel-slide name="myboard" class="column no-wrap">
        <div class="text-h5 text-blue-grey-14">Mis Tableros</div>
        <br /><br />
        <div class="text-body1">
          En esta vista, se encuentra la lista de todos los tableros creados por
          el usuario. Cada tablero muestra el nombre, el año y el semestre al
          cual corresponde, además cada tablero, tendrá la opción de editar los
          datos de (nombre, año, semestre y color), como tambien la opción de
          eliminar dicho tablero.
        </div>
        <div class="text-body1">
          También esta vista contempla la opción de crear nuevos tableros,
          indicando su nombre, semestre y color de fondo.
        </div>
      </q-carousel-slide>

      <q-carousel-slide name="guestboard" class="column no-wrap">
        <div class="text-h5 text-blue-grey-14">Tableros Invitado</div>
        <br />
        <br />
        <div class="text-body1">
          En esta vista, se encuenta la lista de tableros, en la cual el usuario
          pertence como invitado, mostrando información de nombre, año y
          semestre, el orden en que se mostrará esta lista, dependerá de la
          fecha en que el usuario fue invitado en dichos tablero. La opción que
          proporciona cada tablero es la de desvincularse, esto quiere decir que
          el usuario pierde relación con el tablero en el cual fue invitado.
        </div>
      </q-carousel-slide>

      <q-caousel-slide name="board" class="column no-wrap q-pa-md">
        <div class="text-h5 text-blue-grey-14">Tablero</div>
        <br />
        <br />
        <div class="text-body1">
          Al abrir un tablero, ya sea propio o invitado, en la barra superior,
          se mostrarán los usuarios conectados al tablero en tiempo real, al
          presionar, en cada usuario, se mostrará la información de este.
          También se cuenta con un opción de invitar usuarios, mediante el email
          (máximo 5 usuarios).
        </div>
        <div class="text-body1">
          Dentro de las funcionalidades se encuentra la creación de ciclos, e
          indicadores (no se pueden crear indicadores, sin tener ciclos ya
          creados). Tanto ciclos como indicadores, se pueden editar o eliminar.
        </div>
        <div class="text-body1">
          Para realizar las evaluaciones de los indicadores, se cuenta con una
          barra con 3 opciones, mostrandose una carita triste, normal, o feliz,
          para que el usuario de su apreciación, está evaluación será secreta
          entre los usuarios, solo se podrá ver el porcentaje global, del ciclo
          y tablero también, se cuenta con la opción de eliminar la evaluación.
          Los cambios, en los valores de felicidad del ciclo y del tablero, se
          mostrarán en tiempo real.
        </div>
      </q-caousel-slide>
    </q-carousel>

    <div class="row justify-center">
      <q-btn-toggle
        glossy
        v-model="slide"
        :options="[
          { label: 'Perfil y Configuración', value: 'account' },
          { label: 'Mis Tableros', value: 'myboard' },
          { label: 'Tableros Invitado', value: 'guestboard' },
          { label: 'Tablero', value: 'board' },
        ]"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const slide = ref("account");
const slideAdmin = ref("info");
</script>
