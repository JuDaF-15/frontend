<template>
  <div>
    <div>
      <input type="text" v-model="matricula" placeholder="matricula" style="width: fit-content;">
      <!-- Cambiar a un menú desplegable para seleccionar el conductor -->
      <select style="width: fit-content;" v-model="c">
        <option value="">Seleccione el conductor...</option>
        <option v-for="(conductor, i) in conduc" :key="i" :value="conductor._id">
          {{ conductor.nombre }}
        </option>
      </select>
      <input type="text" v-model="tipo" placeholder="tipo" style="width: fit-content;">
      <input type="text" v-model="marca" placeholder="marca" style="margin-top: 10px;width: fit-content;">
      <input type="text" v-model="modelo" placeholder="modelo" style="margin-top: 10px;width: fit-content;">
      <input type="number" v-model="capacidad" placeholder="capacidad" style="margin-top: 10px;width: fit-content;">
    </div><br>

    <p>{{ c }}</p>
    <p>jaja</p>

    <div>
      <button @click="registrar">Guardar Vehículo</button>
    </div><br>

    <div>
      <table>
        <thead>
          <tr>
            <th>Matricula</th>
            <th>Conductor</th>
            <th>Tipo</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Capacidad</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="vehiculo in data" :key="vehiculo.matricula">
            <td>{{ vehiculo.matricula }}</td>
            <td>{{ vehiculo.conductor }}</td>
            <td>{{ vehiculo.tipo }}</td>
            <td>{{ vehiculo.marca }}</td>
            <td>{{ vehiculo.modelo }}</td>
            <td>{{ vehiculo.capacidad }}</td>
            <td>
              <div>
                <button style="margin-right: 5px;">✏️</button>
                <button style="margin-left: 5px;">⛔</button>
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
let data = ref([])
let c = ref("")

onMounted(() => {
  traerConductores()
})
traer();

async function traerConductores() {
  let res = await useConductor.traerConductor()
  conduc.value = res.data.chofer
  console.log(conduc.value);
}

async function traer() {
  let res = await useVehiculo.traerVehiculo()
  console.log(res);
  data.value = res.data.vehiculo
}

async function registrar() {
  let res = await useVehiculo.registrarVehiculo({
    matricula: matricula.value,
    conductor: c.value,
    tipo: tipo.value,
    marca: modelo.value,
    modelo: modelo.value,
    capacidad: capacidad.value
  })

  if (data) {
    // Agregar la nueva dataeta al array
    data.value.push(res.data.vehiculo);
  }
}

console.log(data);

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

thead {
  background-color: #f2f2f2;
}

tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
  