<template>
  <div>

    <div>
      <q-btn label="Registrar Vehículo" color="primary" @click="alert = true; nuevo()" />
    </div><br><br>

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
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
    <div>
      <input type="text" placeholder="Matrícula" style="width: 20%;" v-model="mat">
      <q-btn label="Buscar" color="primary" @click="buscarMatricula" />
    </div><br>

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
import { onMounted, ref } from "vue"

const useVehiculo = useVehiculoStore()
const useConductor = useConductorStore()

let matricula = ref("")
let tipo = ref("")
let marca = ref("")
let modelo = ref("")
let capacidad = ref("")

let conduc = ref([])
let mat = ref("")
let encontrado = ref("")
let id = ref("")
let bd = ref("")
let busquedaActiva = ref(false)
let data = ref([])
let c = ref("")
let alert = ref(false)

onMounted(() => {
  traerConductores()
})
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

async function registrar() {
  let res = await useVehiculo.registrarVehiculo({
    matricula: matricula.value,
    chofer_id: c.value,
    tipo: tipo.value,
    marca: marca.value,
    modelo: modelo.value,
    capacidad: capacidad.value
  })

  console.log(res);

  alert.value = false
  vaciar()
  traer()

  if (data) {
    data.value.unshift(res.data.vehiculo);
  }

  if (busquedaActiva.value) {
    const matVeh = mat.value;
    encontrado.value = data.value.filter(item => item.matricula.includes(matVeh));
  }
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

function editarVehiculo(vehiculo) {
  bd.value = 0
  id.value = vehiculo._id
  matricula.value = vehiculo.matricula
  c.value = vehiculo.chofer_id.nombre
  tipo.value = vehiculo.tipo
  marca.value = vehiculo.marca
  modelo.value = vehiculo.modelo
  capacidad.value = vehiculo.capacidad

  alert.value = true;
  console.log(vehiculo);
}

async function actualizar() {
  const res = await useVehiculo.actualizarVehiculo(id.value, matricula.value, c.value, tipo.value,
    marca.value, modelo.value, capacidad.value)
  console.log(res);

  const indexActualizado = data.value.findIndex((vehiculos) => vehiculos._id === id.value);
  if (indexActualizado !== -1) {
    data.value[indexActualizado].matricula = matricula.value;
    data.value[indexActualizado].chofer_id.nombre = c.value
    data.value[indexActualizado].tipo = tipo.value
    data.value[indexActualizado].marca = marca.value
    data.value[indexActualizado].modelo = modelo.value
    data.value[indexActualizado].capacidad = capacidad.value
  }
  alert.value = false
  traer()
}

async function buscarMatricula() {
  const matVeh = mat.value.trim()
  let res = await useVehiculo.traerVehiculoMatricula(matVeh)

  encontrado.value = data.value.filter((item) =>
    item.matricula.includes(matVeh)
  )
  busquedaActiva.value = true
  return res
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
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

button {
  background-color: #0a18e2;
  color: #fff;
  padding: 10px;
  border: none;
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

tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
  
