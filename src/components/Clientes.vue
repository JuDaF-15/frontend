<template>
    <div>
        <div>
            <q-btn label="Registrar Cliente" color="primary" @click="alert = true" />
        </div><br><br>
        <q-dialog v-model="alert">
            <q-card style="width: 32%;">
                <q-card-section>
                    <div class="text-h6">Registrar Cliente</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div>
                        <q-input outlined label="Cédula" v-model="cedula" />
                        <q-input style="margin-top: 10px;" outlined label="Nombre" v-model="nombre" />
                        <q-input style="margin-top: 10px;" outlined label="Teléfono" v-model="telefono" />
                    </div><br>

                    <q-card-actions align="right">
                        <q-btn style="margin-top: -10px;" label="Guardar" color="primary" @click="registrar" />
                    </q-card-actions>
                </q-card-section>
            </q-card>
        </q-dialog>

        <div>
            <input type="text" placeholder="Cédula" style="width: 20%;" v-model="cc">
            <q-btn label="Buscar" color="primary" @click="buscarCedula" />
        </div><br>

        <div v-if="!busquedaActiva">
            <table>
                <thead>
                    <tr>
                        <th>Cédula</th>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cliente in data" :key="cliente">
                        <td>{{ cliente.cedula }}</td>
                        <td>{{ cliente.nombre }}</td>
                        <td>{{ cliente.telefono }}</td>
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

        <div v-if="busquedaActiva">
            <table>
                <thead>
                    <tr>
                        <th>Cédula</th>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cliente in encontrado" :key="cliente">
                        <td>{{ cliente.cedula }}</td>
                        <td>{{ cliente.nombre }}</td>
                        <td>{{ cliente.telefono }}</td>
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
import { useClienteStore } from "../stores/clientes.js"
import { ref } from "vue"

const useCliente = useClienteStore()
let cedula = ref("")
let nombre = ref("")
let telefono = ref("")

let data = ref([])
let cc = ref("")
let alert = ref(false)
let encontrado = ref("")
let busquedaActiva = ref(false)

traer();

async function traer() {
    let res = await useCliente.traerCliente()
    console.log(res);
    data.value = res.data.pasajero
}

async function registrar() {
    let res = await useCliente.registrarCliente({
        cedula: cedula.value,
        nombre: nombre.value,
        telefono: telefono.value
    })

    vaciar()

    if (data) {
        data.value.push(res.data.pasajero);
    }

    if (busquedaActiva.value) {
        const cedulaPasa = cc.value;
        encontrado.value = data.value.filter(item => item.cedula.includes(cedulaPasa));
    }
}

async function buscarCedula() {
    const cedulaPasa = cc.value.trim()
    let res = await useCliente.traerPasajeroCedula(cedulaPasa)

    encontrado.value = data.value.filter((item) =>
        item.cedula.includes(cedulaPasa)
    )
    busquedaActiva.value = true
    return res
}

function vaciar() {
    cedula.value = ""
    nombre.value = ""
    telefono.value = ""
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
  

  