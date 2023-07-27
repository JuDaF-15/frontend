<template>
  <div>

    <div>
      <q-btn label="Registrar Conductor" color="primary" @click="alert = true" />
    </div><br><br>
    <q-dialog v-model="alert">
      <q-card style="width: 32%;">
        <q-card-section>
          <div class="text-h6">Registrar Conductor</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div>
            <q-input outlined label="Cédula" v-model="cedula" />
            <q-input style="margin-top: 10px;" outlined label="Nombre" v-model="nombre" />
            <q-input style="margin-top: 10px;" outlined label="Teléfono" v-model="telefono" />
            <q-input style="margin-top: 10px;" outlined label="Número de Licencia" v-model="numero_licencia" />
            <q-input style="margin-top: 10px;" outlined label="Categoría Licencia" v-model="categoria_licencia" />
            <q-input style="margin-top: 10px;" outlined label="Fecha de Vencimiento" v-model="fecha_vencimiento"
              type="date" />
            <q-input style="margin-top: 10px;" outlined label="Experiencia" v-model="experiencia" />
          </div><br>

          <q-card-actions align="right">
            <button style="margin-top: -10px;" @click="registrar()">
              Guardar
            </button>
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div>
      <input type="text" style="width: 20%;" v-model="cc">
      <button @click="buscarCedula">buscar</button>
    </div><br>

    <div>
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
import { useConductorStore } from "../stores/conductores.js"
import { ref } from "vue"

const useConductor = useConductorStore()
let cedula = ref("")
let nombre = ref("")
let telefono = ref("")
let numero_licencia = ref("")
let categoria_licencia = ref("")
let fecha_vencimiento = ref("")
let experiencia = ref("")

let data = ref([])
let cc = ref("")
let alert = ref(false)

traer();

async function traer() {
  let res = await useConductor.traerConductor()
  console.log(res);
  data.value = res.data.chofer
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
  })
  vaciar()

  if (data) {
    data.value.push(res.data.chofer);
  }

}

async function buscarCedula() {
  const cedulaConduct = cc.value // cedula v-model
  let res = await useConductor.traerConductorCedula(cedulaConduct)
  console.log(res);
  return res
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
