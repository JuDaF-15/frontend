<template>
  <div>

    <div>
      <q-btn label="Registrar Conductor" color="primary" @click="alert = true; nuevo()" />
    </div><br><br>
    <q-dialog v-model="alert">
      <q-card style="width: 32%;">
        <q-card-section>
          <div class="text-h6">{{ bd === 0 ? 'Editar Conductor' : 'Registrar Conductor' }}</div>
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
            <q-input style="margin-top: 5px;" outlined label="Experiencia" v-model="experiencia" />
          </div><br>

          <q-card-actions align="right">
            <q-btn v-if="bd == 1" style="margin-top: -10px;" label="Guardar" color="primary" @click="registrar" />
            <q-btn v-else style="margin-top: -10px;" label="Actualizar" color="primary" @click="actualizar" />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div>
      <input type="text" placeholder="Cédula" style="width: 20%;" v-model="cc">
      <q-btn label="Buscar" color="primary" @click="buscarCedula" />
    </div><br>

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
                <q-btn color="primary" style="margin-right: 5px;" @click="editarChofer(chofer)">✏️</q-btn>
                <q-btn color="primary" style="margin-left: 5px;">⛔</q-btn>
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
            <td>
              <div>
                <q-btn color="primary" style="margin-right: 5px;" @click="editarChofer(chofer)">✏️</q-btn>
                <q-btn color="primary" style="margin-left: 5px;">⛔</q-btn>
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

  alert.value = false
  vaciar()

  if (data) {
    data.value.push(res.data.chofer);
  }

  if (busquedaActiva.value) {
    const cedulaConduct = cc.value;
    encontrado.value = data.value.filter(item => item.cedula.includes(cedulaConduct));
  }

}

async function buscarCedula() {
  const cedulaConduct = cc.value.trim()
  let res = await useConductor.traerConductorCedula(cedulaConduct)

  encontrado.value = data.value.filter((item) =>
    item.cedula.includes(cedulaConduct)
  )
  busquedaActiva.value = true
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
  console.log(chofer);
}

async function actualizar() {
  const res = await useConductor.actualizarConductor(id.value, cedula.value, nombre.value, telefono.value,
    numero_licencia.value, categoria_licencia.value, fecha_vencimiento.value, experiencia.value)
  console.log(res);

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
  alert.value = false
  traer()
}

</script>

<style scoped>
input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
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

tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>