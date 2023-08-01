<template>
  <div>
    
    <div>
      <q-btn label="Registrar Vehículo" color="primary" @click="alert = true" />
    </div><br><br>

    <q-dialog v-model="alert">
      <q-card style="width: 32%;">
        <q-card-section>
          <div class="text-h6">Registrar Vehículo</div>
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
            <q-btn style="margin-top: -10px;" label="Guardar" color="primary" @click="registrar" />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>

    <p>{{ c }}</p>

    <div class="tabla">
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

let alert = ref(false)

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

.tabla{
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
  
