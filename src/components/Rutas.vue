<template>
    <div>
        <div>
            <q-btn label="Registrar Ruta" color="primary" @click="alert = true; nuevo()" />
            <input type="text" placeholder="Nombre de Ruta" style="width: 20%;margin-left: 58%;" v-model="nom">
            <q-btn label="Buscar" color="primary" @click="buscarNombre" />
        </div><br><br>

        <q-dialog v-model="alert">
            <q-card style="width: 32%;">
                <q-card-section>
                    <div class="text-h6">{{ bd === 0 ? 'Editar Ruta' : 'Registrar Ruta' }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div>
                        <q-input outlined label="Código" v-model="codigoRuta" />
                        <q-input style="margin-top: 10px;" outlined label="Nombre" v-model="nombre" />
                        <q-input style="margin-top: 10px;" outlined label="Origen" v-model="origen" />
                        <q-input style="margin-top: 10px;" outlined label="Destino" v-model="destino" />
                        <q-input style="margin-top: 10px;" type="number" outlined label="Valor" v-model="valor" />
                        <q-input style="margin-top: 10px;" outlined label="Hora de Salida" v-model="hora_salida"
                            type="time" />
                    </div><br>
                    <q-card-actions align="right">
                        <q-btn v-if="bd == 1" style="margin-top: -10px;" label="Guardar" color="primary"
                            @click="registrar" />
                        <q-btn v-else style="margin-top: -10px;" label="Actualizar" color="primary" @click="actualizar" />
                    </q-card-actions>
                </q-card-section>
            </q-card>
        </q-dialog>

        <div class="tabla" v-if="!busquedaActiva">
            <table>
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Origen</th>
                        <th>Destino</th>
                        <th>Valor</th>
                        <th>Hora de Salida</th>
                        <th>Estado</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="ruta in data" :key="ruta">
                        <td>{{ ruta.codigoRuta }}</td>
                        <td>{{ ruta.nombre }}</td>
                        <td>{{ ruta.origen }}</td>
                        <td>{{ ruta.destino }}</td>
                        <td>{{ ruta.valor }}</td>
                        <td>{{ ruta.hora_salida }}</td>
                        <td :style="{ color: ruta.estado === 1 ? 'green' : 'red' }">{{ ruta.estado === 1 ? 'Activo'
                            :
                            'Inactivo'
                        }}</td>
                        <td>
                            <div>
                                <q-btn color="primary" style="margin-right: 5px;" @click="editarRuta(ruta)">✏️</q-btn>
                                <q-btn color="primary" style="margin-left: 5px;" @click="estado(ruta)"
                                    v-if="ruta.estado === 1">❌</q-btn>
                                <q-btn color="primary" style="margin-left: 5px;" @click="estado(ruta)" v-else>✅</q-btn>
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
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Origen</th>
                        <th>Destino</th>
                        <th>Valor</th>
                        <th>Hora de Salida</th>
                        <th>Estado</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="ruta in encontrado" :key="ruta">
                        <td>{{ ruta.codigoRuta }}</td>
                        <td>{{ ruta.nombre }}</td>
                        <td>{{ ruta.origen }}</td>
                        <td>{{ ruta.destino }}</td>
                        <td>{{ ruta.valor }}</td>
                        <td>{{ ruta.hora_salida }}</td>
                        <td :style="{ color: ruta.estado === 1 ? 'green' : 'red' }">{{ ruta.estado === 1 ? 'Activo'
                            :
                            'Inactivo'
                        }}</td>
                        <td>
                            <div>
                                <q-btn color="primary" style="margin-right: 5px;" @click="editarRuta(ruta)">✏️</q-btn>
                                <q-btn color="primary" style="margin-left: 5px;" @click="estado(ruta)"
                                    v-if="ruta.estado === 1">❌</q-btn>
                                <q-btn color="primary" style="margin-left: 5px;" @click="estado(ruta)" v-else>✅</q-btn>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>
  
<script setup>
import { useRutaStore } from "../stores/rutas.js"
import { ref } from "vue"

const useRuta = useRutaStore()
let codigoRuta = ref("")
let hora_salida = ref("")
let nombre = ref("")
let origen = ref("")
let destino = ref("")
let valor = ref("")

let nom = ref("")
let alert = ref(false)
let id = ref("")
let bd = ref("")
let encontrado = ref("")
let busquedaActiva = ref(false)
let data = ref([])

traer();

function nuevo() {
    bd.value = 1
    vaciar()
}

async function traer() {
    let res = await useRuta.traerRuta()
    console.log(res);
    data.value = res.data.ruta
    data.value.reverse()
}

async function registrar() {
    let res = await useRuta.registrarRuta({
        codigoRuta: codigoRuta.value,
        nombre: nombre.value,
        origen: origen.value,
        destino: destino.value,
        valor: valor.value,
        hora_salida: hora_salida.value
    })

    alert.value = false
    vaciar()

    if (data) {
        data.value.unshift(res.data.ruta);
    }

    if (busquedaActiva.value) {
        const nomRuta = nom.value;
        encontrado.value = data.value.filter(item => item.nombre.includes(nomRuta));
    }
}

async function estado(ruta) {
    console.log(ruta);

    if (ruta.estado === 1) {
        ruta.estado = 0
    } else {
        ruta.estado = 1
    }
    const res = await useRuta.actualizarEstado(ruta._id, ruta.estado)
    console.log(res);
    traer()
}

async function buscarNombre() {
    const nomRuta = nom.value.trim()
    let res = await useRuta.traerRutaNombre(nomRuta)

    encontrado.value = data.value.filter((item) =>
        item.nombre.includes(nomRuta)
    )
    busquedaActiva.value = true
    return res
}

function vaciar() {
    codigoRuta.value = ""
    nombre.value = ""
    origen.value = ""
    destino.value = ""
    valor.value = ""
    hora_salida.value = ""
}

function editarRuta(ruta) {
    bd.value = 0
    id.value = ruta._id
    codigoRuta.value = ruta.codigoRuta
    nombre.value = ruta.nombre;
    origen.value = ruta.origen;
    destino.value = ruta.destino;
    valor.value = ruta.valor
    hora_salida.value = ruta.hora_salida

    alert.value = true;
    console.log(ruta);
}

async function actualizar() {
    const res = await useRuta.actualizarRuta(id.value, codigoRuta.value, nombre.value, origen.value, destino.value,
        valor.value, hora_salida.value)
    console.log(res);

    const indexActualizado = data.value.findIndex((rutas) => rutas._id === id.value);
    if (indexActualizado !== -1) {
        data.value[indexActualizado].codigoRuta = codigoRuta.value;
        data.value[indexActualizado].nombre = nombre.value;
        data.value[indexActualizado].origen = origen.value
        data.value[indexActualizado].destino = destino.value
        data.value[indexActualizado].valor = valor.value
        data.value[indexActualizado].hora_salida = hora_salida.value;
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
    border-radius: 5px;
}

.tabla {
    height: 60vh;
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

thead {
    background-color: #1190c2;
    color: white;
    position: sticky;
    top: 0;
    z-index: 1;
}

tbody tr:hover{
  background-color: #1511e018;
  color: black;
  font-weight: bold;
  cursor: pointer;
}
</style>
  

  
  

  