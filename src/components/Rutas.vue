<template>
    <div>
        <div>
            <q-btn label="Registrar Ruta" color="primary" @click="alert = true" />
        </div><br><br>

        <q-dialog v-model="alert">
            <q-card style="width: 32%;">
                <q-card-section>
                    <div class="text-h6">Registrar Ruta</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div>
                        <q-input outlined label="Nombre" v-model="nombre" />
                        <q-input style="margin-top: 10px;" outlined label="Origen" v-model="origen" />
                        <q-input style="margin-top: 10px;" outlined label="Destino" v-model="destino" />
                        <q-input style="margin-top: 10px;" type="number" outlined label="Valor" v-model="valor" />
                    </div><br>
                    <q-card-actions align="right">
                        <q-btn style="margin-top: -10px;" label="Guardar" color="primary" @click="registrar" />
                    </q-card-actions>
                </q-card-section>
            </q-card>
        </q-dialog>
        <div>
            <input type="text" placeholder="Nombre de Ruta" style="width: 20%;" v-model="nom">
            <q-btn label="Buscar" color="primary" @click="buscarNombre" />
        </div><br>
        <div class="tabla" v-if="!busquedaActiva">
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Origen</th>
                        <th>Destino</th>
                        <th>Valor</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="ruta in data" :key="ruta">
                        <td>{{ ruta.nombre }}</td>
                        <td>{{ ruta.origen }}</td>
                        <td>{{ ruta.destino }}</td>
                        <td>{{ ruta.valor }}</td>
                        <td>
                            <div>
                                <q-btn color="primary" style="margin-right: 5px;">✏️</q-btn>
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
                        <th>Nombre</th>
                        <th>Origen</th>
                        <th>Destino</th>
                        <th>Valor</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="ruta in encontrado" :key="ruta">
                        <td>{{ ruta.nombre }}</td>
                        <td>{{ ruta.origen }}</td>
                        <td>{{ ruta.destino }}</td>
                        <td>{{ ruta.valor }}</td>
                        <td>
                            <div>
                                <q-btn color="primary" style="margin-right: 5px;">✏️</q-btn>
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
import { useRutaStore } from "../stores/rutas.js"
import { ref } from "vue"

const useRuta = useRutaStore()
let nombre = ref("")
let origen = ref("")
let destino = ref("")
let valor = ref("")

let nom = ref("")
let alert = ref(false)
let encontrado = ref("")
let busquedaActiva = ref(false)
let data = ref([])

traer();

async function traer() {
    let res = await useRuta.traerRuta()
    console.log(res);
    data.value = res.data.ruta
}

async function registrar() {
    let res = await useRuta.registrarRuta({
        nombre: nombre.value,
        origen: origen.value,
        destino: destino.value,
        valor: valor.value,
    })

    vaciar()

    if (data) {
        data.value.push(res.data.ruta);
    }

    if (busquedaActiva.value) {
        const nomRuta = nom.value;
        encontrado.value = data.value.filter(item => item.nombre.includes(nomRuta));
    }
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
    nombre.value = ""
    origen.value = ""
    destino.value = ""
    valor.value = ""
}



</script>
  
<style scoped>
input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
}

.tabla{
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

tbody tr:nth-child(even) {
    background-color: #f2f2f2;
}
</style>
  

  
  

  