<template>
  <div>
    <div class="row">
      <div class="col">
        <q-btn label="Registrar Vehículo" icon="add" color="primary" @click="alert = true; nuevo()" />
      </div>
      <div class="col" style="display: flex;justify-content: flex-end;align-items:center ;">
        <div @click="limpiarBusqueda" style="cursor: pointer;">🗑️</div>
        <input type="text" placeholder="Matrícula" v-model="mat">
        <q-btn label="Buscar" icon="search" color="primary" @click="buscarMatricula" />
      </div>
    </div><br><br>
    <h5 style="margin-top: -15px;text-align: center;">Vehículos</h5>
    <q-dialog v-model="alert">
      <q-card style="width: 32%;">
        <q-card-section>
          <div class="text-h6">{{ bd === 0 ? 'Editar Vehículo' : 'Registrar Vehículo' }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none" style="overflow-x:hidden;">
          <div>
            <q-input outlined label="Matrícula" v-model="matricula" />
            <q-select label="Conductor" outlined style="width: auto;margin-top: 10px;" v-model="c"
              :options="conduc.map(conductor => ({ label: conductor.nombre, value: conductor._id }))" emit-value
              map-options>
            </q-select>
            <q-input style="margin-top: 10px;" outlined label="Tipo" v-model="tipo" />
            <q-input style="margin-top: 10px;" outlined label="Marca" v-model="marca" />
            <q-input style="margin-top: 10px;" outlined label="Modelo" v-model="modelo" />
            <q-input style="margin-top: 10px;" outlined label="Capacidad" v-model="capacidad" type="number" />
          </div><br>

          <q-card-actions align="right">
            <q-btn v-if="bd == 1" style="margin-top: -10px;" label="Guardar" color="primary" @click="registrar" />
            <q-btn v-else style="margin-top: -10px;" label="Actualizar" color="primary" @click="actualizar" />
            <q-btn label="Cancelar" style="margin-top: -10px;" color="negative" v-close-popup />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="spinner-container" v-if="useVehiculo.loading == true">
      <q-spinner style="margin-left: 10px;" color="black" size="5em" :thickness="10" />
    </div>

    <div class="tabla" v-if="!busquedaActiva">
      <table>
        <thead>
          <tr>
            <th>Matricula</th>
            <th>Conductor</th>
            <th>Tipo</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Capacidad</th>
            <th>Estado</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="vehiculo in data" :key="vehiculo.matricula">
            <td>{{ vehiculo.matricula }}</td>
            <td>{{ vehiculo.chofer_id.nombre }}</td>
            <td>{{ vehiculo.tipo }}</td>
            <td>{{ vehiculo.marca }}</td>
            <td>{{ vehiculo.modelo }}</td>
            <td>{{ vehiculo.capacidad }}</td>
            <td :style="{ color: vehiculo.estado === 1 ? 'green' : 'red' }">{{ vehiculo.estado === 1 ? 'Activo'
              :
              'Inactivo'
            }}</td>
            <td>
              <div>
                <q-btn color="primary" style="margin-right: 5px;" @click="editarVehiculo(vehiculo)">✏️</q-btn>
                <q-btn color="primary" style="margin-left: 5px;" @click="estado(vehiculo)"
                  v-if="vehiculo.estado === 1">❌</q-btn>
                <q-btn color="primary" style="margin-left: 5px;" @click="estado(vehiculo)" v-else>✅</q-btn>
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
            <th>Matricula</th>
            <th>Conductor</th>
            <th>Tipo</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Capacidad</th>
            <th>Estado</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="vehiculo in encontrado" :key="vehiculo.matricula">
            <td>{{ vehiculo.matricula }}</td>
            <td>{{ vehiculo.chofer_id.nombre }}</td>
            <td>{{ vehiculo.tipo }}</td>
            <td>{{ vehiculo.marca }}</td>
            <td>{{ vehiculo.modelo }}</td>
            <td>{{ vehiculo.capacidad }}</td>
            <td :style="{ color: vehiculo.estado === 1 ? 'green' : 'red' }">{{ vehiculo.estado === 1 ? 'Activo'
              :
              'Inactivo'
            }}</td>
            <td>
              <div>
                <q-btn color="primary" style="margin-right: 5px;" @click="editarVehiculo(vehiculo)">✏️</q-btn>
                <q-btn color="primary" style="margin-left: 5px;" @click="estado(vehiculo)"
                  v-if="vehiculo.estado === 1">❌</q-btn>
                <q-btn color="primary" style="margin-left: 5px;" @click="estado(vehiculo)" v-else>✅</q-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>


  </div>
</template>
  
<script setup>
import { useVehiculoStore } from "../stores/vehiculos.js"
import { useConductorStore } from "../stores/conductores";
import { ref } from "vue"
import { useQuasar } from 'quasar'


const useVehiculo = useVehiculoStore()
const useConductor = useConductorStore()

let matricula = ref("")
let tipo = ref("")
let marca = ref("")
let modelo = ref("")
let capacidad = ref("")

const $q = useQuasar()
let conduc = ref([])
let mat = ref("")
let encontrado = ref("")
let id = ref("")
let bd = ref("")
let busquedaActiva = ref(false)
let data = ref([])
let errores = ref([])
let c = ref("")
let alert = ref(false)

traerConductores()
traer();


function nuevo() {
  bd.value = 1
  vaciar()
}

async function traerConductores() {
  let res = await useConductor.traerConductor()
  conduc.value = res.data.chofer
  console.log(conduc.value);
}

async function traer() {
  let res = await useVehiculo.traerVehiculo()
  console.log(res);
  data.value = res.data.vehiculo
  data.value.reverse()
}

function validarVacios() {
  if (matricula.value === "" && c.value === "" && tipo.value === "" && marca.value === "" && modelo.value === ""
    && capacidad.value === "") {
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
  let res = await useVehiculo.registrarVehiculo({
    matricula: matricula.value.split(" ").join(""),
    chofer_id: c.value,
    tipo: tipo.value,
    marca: marca.value,
    modelo: modelo.value,
    capacidad: capacidad.value
  }).then((res) => {
    alert.value = false
    vaciar()
    traer()

    if (data) {
      data.value.unshift(res.data.vehiculo);
    }

    $q.notify({
      message: 'Vehículo agregado exitosamente',
      color: 'green',
      position: 'top',
      icon: 'check',
      timeout: Math.random() * 3000
    })
    if (busquedaActiva.value) {
      const matVeh = mat.value;
      encontrado.value = data.value.filter(item => item.matricula.includes(matVeh));
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
    }
    else if (error.response && error.response.data && validarVacios() === true) {
      errores.value = error.response.data.errors[0].msg
      validar()

    } else {
      console.log(error);
    }
  });

}

async function estado(vehiculo) {
  console.log(vehiculo);

  if (vehiculo.estado === 1) {
    vehiculo.estado = 0
  } else {
    vehiculo.estado = 1
  }
  const res = await useVehiculo.actualizarEstado(vehiculo._id, vehiculo.estado)
  console.log(res);
  traer()
}
function limpiarBusqueda() {
  mat.value = ""
  busquedaActiva.value = false
}

async function buscarMatricula() {
  if (mat.value.trim() == "") {
    $q.notify({
      message: 'Introduzca la matrícula a buscar',
      color: 'red',
      position: 'top',
      icon: 'warning',
      timeout: Math.random() * 3000
    })
  } else {
    const matVeh = mat.value.trim().split(" ").join("")
    await useVehiculo.traerVehiculoMatricula(matVeh)
      .then((res) => {
        encontrado.value = data.value.filter((item) =>
          item.matricula.includes(matVeh)
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

function editarVehiculo(vehiculo) {
  bd.value = 0
  id.value = vehiculo._id
  matricula.value = vehiculo.matricula
  c.value = vehiculo.chofer_id._id
  tipo.value = vehiculo.tipo
  marca.value = vehiculo.marca
  modelo.value = vehiculo.modelo
  capacidad.value = vehiculo.capacidad

  alert.value = true;
}

async function actualizar() {
  const res = await useVehiculo.actualizarVehiculo(id.value, matricula.value.split(" ").join(""), c.value, tipo.value,
    marca.value, modelo.value, capacidad.value)
    .then((res) => {
      console.log(res);
      alert.value = false
      traer()

      const indexActualizado = data.value.findIndex((vehiculos) => vehiculos._id === id.value);
      if (indexActualizado !== -1) {
        data.value[indexActualizado].matricula = matricula.value.split(" ").join("");
        data.value[indexActualizado].chofer_id._id = c.value
        data.value[indexActualizado].tipo = tipo.value
        data.value[indexActualizado].marca = marca.value
        data.value[indexActualizado].modelo = modelo.value
        data.value[indexActualizado].capacidad = capacidad.value
      }
      $q.notify({
        message: 'Vehículo editado exitosamente',
        color: 'green',
        position: 'top',
        icon: 'check',
        timeout: Math.random() * 3000
      })

      const indexActualizadoEncontrado = encontrado.value.findIndex((vehiculos) => vehiculos._id === id.value);
      if (indexActualizadoEncontrado !== -1) {
        encontrado.value[indexActualizadoEncontrado].matricula = matricula.value;
        encontrado.value[indexActualizadoEncontrado].chofer_id._id = c.value
        encontrado.value[indexActualizadoEncontrado].tipo = tipo.value
        encontrado.value[indexActualizadoEncontrado].marca = marca.value
        encontrado.value[indexActualizadoEncontrado].modelo = modelo.value
        encontrado.value[indexActualizadoEncontrado].capacidad = capacidad.value
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
      else if (error.response && error.response.data) {
        errores.value = error.response.data.errors[0].msg
        validar()
      } else {
        console.log(error);
      }
    })

}

function vaciar() {
  matricula.value = ""
  c.value = ""
  tipo.value = ""
  marca.value = ""
  modelo.value = ""
  capacidad.value = ""
}

</script>
  
<style scoped>
input {
  width: auto;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  border-radius: 5px;
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

thead {
  background-color: #1190c2;
  color: white;
  position: sticky;
  top: 0;
  z-index: 1;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
}

tbody tr:hover {
  background-color: #1511e018;
  color: black;
  font-weight: bold;
  cursor: pointer;
}
</style>
  
