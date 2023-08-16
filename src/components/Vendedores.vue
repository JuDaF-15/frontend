<template>
    <div>
        <div class="row">
            <div class="col">
                <q-btn label="Registrar Vendedor" icon="add" color="primary" @click="alert = true; nuevo()" />
            </div>
            <div class="col" style="display: flex;justify-content: flex-end;align-items:center ;">
                <div @click="limpiarBusqueda" style="cursor: pointer;">🗑️</div>
                <input type="number" placeholder="Cédula" v-model="cc">
                <q-btn label="Buscar" icon="search" color="primary" @click="buscarCedula" />
            </div>
        </div><br><br>
        <h5 style="margin-top: -15px;text-align: center;">Vendedores</h5>

        <q-dialog v-model="alert">
            <q-card style="width: 32%;">
                <q-card-section>
                    <div class="text-h6">{{ bd === 0 ? 'Editar Vendedor' : 'Registrar Vendedor' }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div>
                        <q-input outlined label="Cédula" type="number" v-model="cedula" />
                        <q-input style="margin-top: 10px;" outlined label="Nombre" v-model="nombre" />
                        <q-input style="margin-top: 10px;" type="number" outlined label="Teléfono" v-model="telefono" />
                        <q-input style="margin-top: 10px;" outlined label="Username" v-model="username" />
                        <q-input style="margin-top: 10px;" outlined label="Contraseña" v-model="clave" type="password" />

                    </div><br>
                    <q-card-actions align="right">
                        <q-btn v-if="bd == 1" style="margin-top: -10px;" label="Guardar" color="primary"
                            @click="registrar()" />
                        <q-btn v-else style="margin-top: -10px;" label="Actualizar" color="primary" @click="actualizar()" />
                        <q-btn label="Cancelar" style="margin-top: -10px;" color="negative" v-close-popup />
                    </q-card-actions>
                </q-card-section>
            </q-card>
        </q-dialog>

        <div class="spinner-container" v-if="useVendedor.loading == true">
            <q-spinner style="margin-left: 10px;" color="black" size="5em" :thickness="10" />
        </div>

        <div class="tabla" v-if="!busquedaActiva">
            <table>
                <thead>
                    <tr>
                        <th>Cédula</th>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Username</th>
                        <th>Estado</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="empleado in data" :key="empleado">
                        <td>{{ empleado.cedula }}</td>
                        <td>{{ empleado.nombre }}</td>
                        <td>{{ empleado.telefono }}</td>
                        <td>{{ empleado.username }}</td>
                        <td :style="{ color: empleado.estado === 1 ? 'green' : 'red' }">{{ empleado.estado === 1 ? 'Activo'
                            :
                            'Inactivo'
                        }}</td>
                        <td>
                            <div>
                                <q-btn color="primary" style="margin-right: 5px;"
                                    @click="editarEmpleado(empleado)">✏️</q-btn>
                                <q-btn color="primary" style="margin-left: 5px;" @click="estado(empleado)"
                                    v-if="empleado.estado === 1">❌</q-btn>
                                <q-btn color="primary" style="margin-left: 5px;" @click="estado(empleado)" v-else>✅</q-btn>
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
                        <th>Username</th>
                        <th>Estado</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="empleado in encontrado" :key="empleado">
                        <td>{{ empleado.cedula }}</td>
                        <td>{{ empleado.nombre }}</td>
                        <td>{{ empleado.telefono }}</td>
                        <td>{{ empleado.username }}</td>
                        <td :style="{ color: empleado.estado === 1 ? 'green' : 'red' }">{{ empleado.estado === 1 ? 'Activo'
                            :
                            'Inactivo'
                        }}</td>
                        <td>
                            <div>
                                <q-btn color="primary" style="margin-right: 5px;"
                                    @click="editarEmpleado(empleado)">✏️</q-btn>
                                <q-btn color="primary" style="margin-left: 5px;" @click="estado(empleado)"
                                    v-if="empleado.estado === 1">❌</q-btn>
                                <q-btn color="primary" style="margin-left: 5px;" @click="estado(empleado)" v-else>✅</q-btn>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<script setup>
import { useVendedorStore } from "../stores/vendedores.js"
import { ref } from "vue"
import { useQuasar } from 'quasar'


const useVendedor = useVendedorStore()
let cedula = ref("")
let nombre = ref("")
let telefono = ref("")
let username = ref("")
let clave = ref("")

const $q = useQuasar()
const $a = useQuasar()

let cc = ref("")
let alert = ref(false)
let data = ref([])
let errores = ref([])
let id = ref("")
let bd = ref("")
let encontrado = ref("")
let busquedaActiva = ref(false)

traer();

function nuevo() {
    bd.value = 1
    vaciar()
}

function validarVacios() {
    if (cedula.value === "" && nombre.value === "" && telefono.value === "" && username.value === ""
        && clave.value === "") {
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
    return true
}

async function traer() {
    let res = await useVendedor.traerVendedor()
    console.log(res);
    data.value = res.data.empleado
    data.value.reverse()
}

async function registrar() {
    let res = await useVendedor.registrarVendedor({
        cedula: cedula.value,
        nombre: nombre.value,
        telefono: telefono.value,
        username: username.value,
        clave: clave.value
    }).then((res) => {
        alert.value = false
        vaciar()

        if (data) {
            data.value.unshift(res.data.empleado);
        }

        $q.notify({
            message: 'Vendedor agregado exitosamente',
            color: 'green',
            position: 'top',
            icon: 'check',
            timeout: Math.random() * 3000
        })
        if (busquedaActiva.value) {
            const cedulaEmple = cc.value;
            encontrado.value = data.value.filter(item => item.cedula.includes(cedulaEmple));
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

async function estado(empleado) {
    console.log(empleado);

    if (empleado.estado === 1) {
        empleado.estado = 0
    } else {
        empleado.estado = 1
    }
    const res = await useVendedor.actualizarEstado(empleado._id, empleado.estado)
    console.log(res);
    traer()
}

function limpiarBusqueda() {
    cc.value = ""
    busquedaActiva.value = false
}

async function buscarCedula() {
    if (cc.value == "") {
        $q.notify({
            message: 'Introduzca la cédula a buscar',
            color: 'red',
            position: 'top',
            icon: 'warning',
            timeout: Math.random() * 3000
        })
    } else {
        const cedulaEmple = cc.value.toString()
        await useVendedor.traerVendedorCedula(cedulaEmple)
            .then((res) => {
                encontrado.value = data.value.filter((item) =>
                    item.cedula.includes(cedulaEmple)
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

function vaciar() {
    cedula.value = ""
    nombre.value = ""
    telefono.value = ""
    username.value = ""
    clave.value = ""
}

function editarEmpleado(empleado) {
    bd.value = 0
    id.value = empleado._id
    cedula.value = empleado.cedula
    nombre.value = empleado.nombre;
    telefono.value = empleado.telefono
    username.value = empleado.username
    clave.value = empleado.clave

    alert.value = true;
}

async function actualizar() {
    const res = await useVendedor.actualizarVendedor(id.value, cedula.value, nombre.value,
        telefono.value, username.value, clave.value)
        .then((res) => {
            alert.value = false
            traer()

            const indexActualizado = data.value.findIndex((vendedor) => vendedor._id === id.value);
            if (indexActualizado !== -1) {
                data.value[indexActualizado].cedula = cedula.value;
                data.value[indexActualizado].nombre = nombre.value;
                data.value[indexActualizado].telefono = telefono.value;
                data.value[indexActualizado].username = username.value;
                data.value[indexActualizado].clave = clave.value;
            }
            $q.notify({
                message: 'Vendedor editado exitosamente',
                color: 'green',
                position: 'top',
                icon: 'check',
                timeout: Math.random() * 3000
            })

            const indexActualizadoEncontrado = encontrado.value.findIndex((vendedor) => vendedor._id === id.value);
            if (indexActualizadoEncontrado !== -1) {
                encontrado.value[indexActualizadoEncontrado].cedula = cedula.value;
                encontrado.value[indexActualizadoEncontrado].nombre = nombre.value;
                encontrado.value[indexActualizadoEncontrado].telefono = telefono.value;
                encontrado.value[indexActualizadoEncontrado].username = username.value;
                encontrado.value[indexActualizadoEncontrado].clave = clave.value;
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
            else if (error.response && error.response.data && validarVacios() === true) {
                errores.value = error.response.data.errors[0].msg
                validar()
            } else {
                console.log(error);
            }
        })
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
    height: 60vh;
    overflow-y: auto;
}

table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
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
  

  