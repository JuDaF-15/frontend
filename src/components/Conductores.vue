<template>
  <div>
    <div class="row">
      <div class="col">
        <q-btn label="Registrar Conductor" icon="add" color="primary" @click="alert = true; nuevo()" />
      </div>
      <div class="col" style="display: flex;justify-content: flex-end;align-items:center;">
        <div @click="limpiarBusqueda" style="cursor: pointer;">🗑️</div>
        <input type="text" placeholder="Cédula" v-model="cc">
        <q-btn label="Buscar" icon="search" color="primary" @click="buscarCedula" />
      </div>
    </div><br><br>
    <h5 style="margin-top: -15px;text-align: center;">Conductores</h5>

    <q-dialog v-model="alert">
      <q-card style="width: 32%;">
        <q-card-section>
          <div class="text-h6">{{ bd === 0 ? 'Editar Conductor' : 'Registrar Conductor' }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div>
            <q-input outlined label="Cédula" type="number" v-model="cedula" />
            <q-input style="margin-top: 10px;" outlined label="Nombre" v-model="nombre" />
            <q-input style="margin-top: 10px;" type="number" outlined label="Teléfono" v-model="telefono" />
            <q-input style="margin-top: 10px;" type="number" outlined label="Número de Licencia"
              v-model="numero_licencia" />
            <q-input style="margin-top: 10px;" outlined label="Categoría Licencia" v-model="categoria_licencia" />
            <q-input style="margin-top: 10px;" outlined label="Fecha de Vencimiento" v-model="fecha_vencimiento"
              type="date" />
            <q-input style="margin-top: 5px;" outlined label="Experiencia" v-model="experiencia" />
          </div><br>

          <q-card-actions align="right">
            <q-btn v-if="bd == 1" style="margin-top: -10px;" label="Guardar" color="primary" @click="registrar()" />
            <q-btn v-else style="margin-top: -10px;" label="Actualizar" color="primary" @click="actualizar()" />
            <q-btn label="Cancelar" style="margin-top: -10px;" color="negative" v-close-popup />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="spinner-container" v-if="useConductor.loading == true">
      <q-spinner style="margin-left: 10px;" color="black" size="5em" :thickness="10" />
    </div>
    <div class="tabla" v-if="!busquedaActiva">
      <table>
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>No. Licencia</th>
            <th>Cat. Licencia</th>
            <th>Fecha de Vencimiento</th>
            <th>Experiencia</th>
            <th>Estado</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="chofer in data" :key="chofer">
            <td>{{ chofer.cedula }}</td>
            <td>{{ chofer.nombre }}</td>
            <td>{{ chofer.telefono }}</td>
            <td>{{ chofer.numero_licencia }}</td>
            <td>{{ chofer.categoria_licencia }}</td>
            <td>{{ chofer.fecha_vencimiento }}</td>
            <td>{{ chofer.experiencia }}</td>
            <td :style="{ color: chofer.estado === 1 ? 'green' : 'red' }">{{ chofer.estado === 1 ? 'Activo' : 'Inactivo'
            }}</td>
            <td>
              <div>
                <q-btn color="primary" style="margin-right: 5px;" @click="editarChofer(chofer)">✏️</q-btn>
                <q-btn color="primary" style="margin-left: 5px;" @click="estado(chofer)"
                  v-if="chofer.estado === 1">❌</q-btn>
                <q-btn color="primary" style="margin-left: 5px;" @click="estado(chofer)" v-else>✅</q-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="tabla" v-if="busquedaActiva">
      <table>
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>No. Licencia</th>
            <th>Cat. Licencia</th>
            <th>Fecha de Vencimiento</th>
            <th>Experiencia</th>
            <th>Estado</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="chofer in encontrado" :key="chofer">
            <td>{{ chofer.cedula }}</td>
            <td>{{ chofer.nombre }}</td>
            <td>{{ chofer.telefono }}</td>
            <td>{{ chofer.numero_licencia }}</td>
            <td>{{ chofer.categoria_licencia }}</td>
            <td>{{ chofer.fecha_vencimiento }}</td>
            <td>{{ chofer.experiencia }}</td>
            <td :style="{ color: chofer.estado === 1 ? 'green' : 'red' }">{{ chofer.estado === 1 ? 'Activo' : 'Inactivo'
            }}</td>
            <td>
              <div>
                <q-btn color="primary" style="margin-right: 5px;" @click="editarChofer(chofer)">✏️</q-btn>
                <q-btn color="primary" style="margin-left: 5px;" @click="estado(chofer)"
                  v-if="chofer.estado === 1">❌</q-btn>
                <q-btn color="primary" @click="estado(chofer)" style="margin-left: 5px;" v-else>✅</q-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>


  </div>
</template>

<script setup>
import { useConductorStore } from "../stores/conductores.js"
import { ref } from "vue"
import { useQuasar } from "quasar"

const useConductor = useConductorStore()
let cedula = ref("")
let nombre = ref("")
let telefono = ref("")
let numero_licencia = ref("")
let categoria_licencia = ref("")
let fecha_vencimiento = ref("")
let experiencia = ref("")

const $q = useQuasar()
let data = ref([])
let errores = ref([])
let cc = ref("")
let id = ref("")
let bd = ref("")
let alert = ref(false)
let encontrado = ref("")
let busquedaActiva = ref(false)

traer();

function nuevo() {
  bd.value = 1
  vaciar()
}

async function estado(chofer) {
  console.log(chofer);

  if (chofer.estado === 1) {
    chofer.estado = 0
  } else {
    chofer.estado = 1
  }
  const res = await useConductor.actualizarEstado(chofer._id, chofer.estado)
  console.log(res);
  traer()
}

async function traer() {
  let res = await useConductor.traerConductor()
  console.log(res);
  data.value = res.data.chofer
  data.value.reverse()
}

function validarVacios() {
  if (cedula.value === "" && nombre.value === "" && telefono.value === "" && categoria_licencia.value === ""
    && numero_licencia.value === "" && fecha_vencimiento.value === "" && experiencia.value === "") {
    $q.notify({
      message: 'Campos vacíos',
      color: 'red',
      icon: 'warning',
      position: 'top',
      timeout: Math.random() * 3000
    })
  } else return true
}

function validar() {
  $q.notify({
    message: errores,
    color: 'red',
    position: 'top',
    icon: 'warning',
    timeout: Math.random() * 3000
  })
}

async function registrar() {
  let res = await useConductor.registrarConductor({
    cedula: cedula.value,
    nombre: nombre.value,
    telefono: telefono.value,
    numero_licencia: numero_licencia.value,
    categoria_licencia: categoria_licencia.value,
    fecha_vencimiento: fecha_vencimiento.value,
    experiencia: experiencia.value
  }).then((res) => {
    alert.value = false
    vaciar()

    if (data) {
      data.value.unshift(res.data.chofer);
    }

    $q.notify({
      message: 'Conductor agregado exitosamente',
      color: 'green',
      position: 'top',
      icon: 'check',
      timeout: Math.random() * 3000
    })

    if (busquedaActiva.value) {
      const cedulaConduct = cc.value;
      encontrado.value = data.value.filter(item => item.cedula.includes(cedulaConduct));
    }
  }).catch((error) => {
    if (error.response && error.response.data.mensaje) {
      const repetida = error.response.data.mensaje
      $q.notify({
        message: repetida,
        color: 'red',
        position: 'top',
        icon: 'warning',
        timeout: Math.random() * 3000
      })
    } else if (error.response && error.response.data && validarVacios() === true) {
      errores.value = error.response.data.errors[0].msg
      validar()

    } else {
      console.log(error);
    }
  });
}

async function buscarCedula() {
  if (cc.value.trim() == "") {
    $q.notify({
      message: 'Introduzca la cédula a buscar',
      color: 'red',
      position: 'top',
      icon: 'warning',
      timeout: Math.random() * 3000
    })
  } else {
    const cedulaConduct = cc.value.trim()
    await useConductor.traerConductorCedula(cedulaConduct)
      .then((res) => {
        encontrado.value = data.value.filter((item) =>
          item.cedula.includes(cedulaConduct)
        )
        busquedaActiva.value = true
      }).catch((error) => {
        if (error.response && error.response.data.mensaje) {
          const noEncontrado = error.response.data.mensaje
          $q.notify({
            message: noEncontrado,
            color: 'red',
            position: 'top',
            icon: 'warning',
            timeout: Math.random() * 3000
          })
        }
      })
  }
}

function vaciar() {
  cedula.value = ""
  nombre.value = ""
  telefono.value = ""
  numero_licencia.value = ""
  categoria_licencia.value = ""
  fecha_vencimiento.value = ""
  experiencia.value = ""
}

function limpiarBusqueda() {
  cc.value = ""
  busquedaActiva.value = false
}

function editarChofer(chofer) {
  bd.value = 0
  id.value = chofer._id
  cedula.value = chofer.cedula;
  nombre.value = chofer.nombre;
  telefono.value = chofer.telefono;
  numero_licencia.value = chofer.numero_licencia
  categoria_licencia.value = chofer.categoria_licencia
  fecha_vencimiento.value = chofer.fecha_vencimiento
  experiencia.value = chofer.experiencia
  alert.value = true;
}

async function actualizar() {
  const res = await useConductor.actualizarConductor(id.value, cedula.value, nombre.value, telefono.value,
    numero_licencia.value, categoria_licencia.value, fecha_vencimiento.value, experiencia.value)
    .then((res) => {
      alert.value = false
      traer()

      const indexActualizado = data.value.findIndex((conductor) => conductor._id === id.value);
      if (indexActualizado !== -1) {
        data.value[indexActualizado].cedula = cedula.value;
        data.value[indexActualizado].nombre = nombre.value;
        data.value[indexActualizado].telefono = telefono.value;
        data.value[indexActualizado].numero_licencia = numero_licencia.value;
        data.value[indexActualizado].categoria_licencia = categoria_licencia.value;
        data.value[indexActualizado].fecha_vencimiento = fecha_vencimiento.value;
        data.value[indexActualizado].experiencia = experiencia.value;

      }

      $q.notify({
        message: 'Conductor editado exitosamente',
        color: 'green',
        position: 'top',
        icon: 'check',
        timeout: Math.random() * 3000
      })

      const indexActualizadoEncontrado = encontrado.value.findIndex((conductor) => conductor._id === id.value);
      if (indexActualizadoEncontrado !== -1) {
        encontrado.value[indexActualizadoEncontrado].cedula = cedula.value;
        encontrado.value[indexActualizadoEncontrado].nombre = nombre.value;
        encontrado.value[indexActualizadoEncontrado].telefono = telefono.value;
        encontrado.value[indexActualizadoEncontrado].numero_licencia = numero_licencia.value;
        encontrado.value[indexActualizadoEncontrado].categoria_licencia = categoria_licencia.value;
        encontrado.value[indexActualizadoEncontrado].fecha_vencimiento = fecha_vencimiento.value;
        encontrado.value[indexActualizadoEncontrado].experiencia = experiencia.value;

      }

    }).catch((error) => {
      errores.value = ''
      if (error.response && error.response.data.mensaje) {
        const repetida = error.response.data.mensaje
        $q.notify({
          message: repetida,
          color: 'red',
          position: 'top',
          icon: 'warning',
          timeout: Math.random() * 3000
        })
      }
      else if (error.response && error.response.data && validarVacios() === true) {
        errores.value = error.response.data.errors[0].msg
        validar()

      } else {
        console.log(error);
      }
    })
}

</script>

<style scoped>
input {
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  border-radius: 5px;
  width: auto;
  margin: 0;
}

.spinner-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
}

.tabla {
  max-height: 60vh;
  overflow-y: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

th,
td {
  border: 1px solid #ccc;
  padding: 10px;
}

thead {
  background-color: #1190c2;
  color: white;
  position: sticky;
  top: 0;
  z-index: 1;
}

tbody tr:hover {
  background-color: #1511e018;
  color: black;
  font-weight: bold;
  cursor: pointer;
}
</style>