<template>
    <div>
        <div class="row">
            <div class="col">
                <q-btn label="Registrar Cliente" icon="add" color="primary" @click="alert = true; nuevo()" />
            </div>
            <div class="col" style="display: flex;justify-content: flex-end;align-items:center;">
                <div @click="limpiarBusqueda" style="cursor: pointer;">🗑️</div>
                <input type="text" placeholder="Cédula" v-model="cc">
                <q-btn label="Buscar" icon="search" color="primary" @click="buscarCedula" />
            </div>
        </div><br><br>

        <q-dialog v-model="alert">
            <q-card style="width: 32%;">
                <q-card-section>
                    <div class="text-h6">{{ bd === 0 ? 'Editar Cliente' : 'Registrar Cliente' }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div>
                        <q-input outlined label="Cédula" type="number" v-model="cedula" />
                        <q-input style="margin-top: 10px;" outlined label="Nombre" v-model="nombre" />
                        <q-input style="margin-top: 10px;" outlined label="Teléfono" v-model="telefono" />
                    </div><br>

                    <q-card-actions align="right">
                        <q-btn v-if="bd == 1" style="margin-top: -10px;" label="Guardar" color="primary"
                            @click="registrar" />
                        <q-btn v-else style="margin-top: -10px;" label="Actualizar" color="primary" @click="actualizar" />
                    </q-card-actions>
                </q-card-section>
            </q-card>
        </q-dialog>

        <div class="spinner-container" v-if="useCliente.loading == true">
            <q-spinner style="margin-left: 10px;" color="black" size="5em" :thickness="10" />
        </div>

        <div class="tabla" v-if="!busquedaActiva">
            <table>
                <thead>
                    <tr>
                        <th>Cédula</th>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Estado</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cliente in data" :key="cliente">
                        <td>{{ cliente.cedula }}</td>
                        <td>{{ cliente.nombre }}</td>
                        <td>{{ cliente.telefono }}</td>
                        <td :style="{ color: cliente.estado === 1 ? 'green' : 'red' }">{{ cliente.estado === 1 ? 'Activo'
                            :
                            'Inactivo'
                        }}</td>
                        <td>
                            <div>
                                <q-btn color="primary" style="margin-right: 5px;" @click="editarCliente(cliente)">✏️</q-btn>
                                <q-btn color="primary" style="margin-left: 5px;" @click="estado(cliente)"
                                    v-if="cliente.estado === 1">❌</q-btn>
                                <q-btn color="primary" style="margin-left: 5px;" @click="estado(cliente)" v-else>✅</q-btn>
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
                        <th>Estado</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cliente in encontrado" :key="cliente">
                        <td>{{ cliente.cedula }}</td>
                        <td>{{ cliente.nombre }}</td>
                        <td>{{ cliente.telefono }}</td>
                        <td :style="{ color: cliente.estado === 1 ? 'green' : 'red' }">{{ cliente.estado === 1 ? 'Activo'
                            :
                            'Inactivo'
                        }}</td>
                        <td>
                            <div>
                                <q-btn color="primary" style="margin-right: 5px;" @click="editarCliente(cliente)">✏️</q-btn>
                                <q-btn color="primary" style="margin-left: 5px;" @click="estado(cliente)"
                                    v-if="cliente.estado === 1">❌</q-btn>
                                <q-btn color="primary" style="margin-left: 5px;" @click="estado(cliente)" v-else>✅</q-btn>
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
import { useQuasar } from 'quasar'


const useCliente = useClienteStore()
let cedula = ref("")
let nombre = ref("")
let telefono = ref("")

let data = ref([])
const $q = useQuasar()
let cc = ref("")
let id = ref("")
let alert = ref(false)
let encontrado = ref("")
let busquedaActiva = ref(false)
let bd = ref("");
let errores = ref([])

traer();

function nuevo() {
    bd.value = 1
    vaciar()
}

function validarVacios() {
    if (cedula.value === "" && nombre.value === "" && telefono.value === "") {
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

async function traer() {
    let res = await useCliente.traerCliente()
    console.log(res);
    data.value = res.data.pasajero
    data.value.reverse()
}

async function registrar() {
    let res = await useCliente.registrarCliente({
        cedula: cedula.value,
        nombre: nombre.value,
        telefono: telefono.value
    }).then((res) => {
        alert.value = false
        vaciar()

        if (data) {
            data.value.unshift(res.data.pasajero);
        }

        $q.notify({
            message: 'Cliente agregado exitosamente',
            color: 'green',
            position: 'top',
            icon: 'check',
            timeout: Math.random() * 3000
        })

        if (busquedaActiva.value) {
            const cedulaPasa = cc.value;
            encontrado.value = data.value.filter(item => item.cedula.includes(cedulaPasa));
        }
    }).catch((error) => {
        if (error.response && error.response.data && validarVacios() === true) {
            errores.value = error.response.data.errors[0].msg
            validar()

        } else {
            console.log(error);
        }
    })
}

async function estado(cliente) {
    console.log(cliente);

    if (cliente.estado === 1) {
        cliente.estado = 0
    } else {
        cliente.estado = 1
    }
    const res = await useCliente.actualizarEstado(cliente._id, cliente.estado)
    console.log(res);
    traer()
}

function limpiarBusqueda() {
    cc.value = ""
    busquedaActiva.value = false
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
        const cedulaPasa = cc.value.trim()
        let res = await useCliente.traerPasajeroCedula(cedulaPasa)

        encontrado.value = data.value.filter((item) =>
            item.cedula.includes(cedulaPasa)
        )
        busquedaActiva.value = true
        return res
    }
}

function editarCliente(cliente) {
    bd.value = 0
    id.value = cliente._id
    cedula.value = cliente.cedula;
    nombre.value = cliente.nombre;
    telefono.value = cliente.telefono;
    alert.value = true;
}

async function actualizar() {
    const res = await useCliente.actualizarCliente(id.value, cedula.value, nombre.value, telefono.value)
        .then((res) => {

            alert.value = false
            traer()

            const indexActualizado = data.value.findIndex((client) => client._id === id.value);
            if (indexActualizado !== -1) {
                data.value[indexActualizado].cedula = cedula.value;
                data.value[indexActualizado].nombre = nombre.value;
                data.value[indexActualizado].telefono = telefono.value;
            }

            $q.notify({
                message: 'Cliente editado exitosamente',
                color: 'green',
                position: 'top',
                icon: 'check',
                timeout: Math.random() * 3000
            })

            const indexActualizadoEncontrado = encontrado.value.findIndex((client) => client._id === id.value);
            if (indexActualizadoEncontrado !== -1) {
                encontrado.value[indexActualizadoEncontrado].cedula = cedula.value;
                encontrado.value[indexActualizadoEncontrado].nombre = nombre.value;
                encontrado.value[indexActualizadoEncontrado].telefono = telefono.value;
            }
        }).catch((error) => {
            errores.value = ''
            if (error.response && error.response.data && validarVacios() === true) {
                errores.value = error.response.data.errors[0].msg
                validar()
            } else {
                console.log(error);
            }
        })

}
function vaciar() {
    cedula.value = ""
    nombre.value = ""
    telefono.value = ""
}

</script>
  
<style scoped>
input {
    width: auto;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    margin: 0
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
    height: 60vh;
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
    padding: 8px;
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