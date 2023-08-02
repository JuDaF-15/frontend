<template>
    <div>
        <div>
            <q-btn label="Registrar Vendedor" color="primary" @click="alert = true; nuevo()" />
        </div><br><br>

        <q-dialog v-model="alert">
            <q-card style="width: 32%;">
                <q-card-section>
                    <div class="text-h6">{{ bd === 0 ? 'Editar Vendedor' : 'Registrar Vendedor' }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div>
                        <q-input outlined label="Cédula" v-model="cedula" />
                        <q-input style="margin-top: 10px;" outlined label="Nombre" v-model="nombre" />
                        <q-input style="margin-top: 10px;" outlined label="Teléfono" v-model="telefono" />
                        <q-input style="margin-top: 10px;" outlined label="Username" v-model="username" />
                        <q-input style="margin-top: 10px;" outlined label="Contraseña" v-model="clave" type="password" />

                    </div><br>
                    <q-card-actions align="right">
                        <q-btn v-if="bd == 1" style="margin-top: -10px;" label="Guardar" color="primary"
                            @click="registrar" />
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
                        <th>Username</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="empleado in data" :key="empleado">
                        <td>{{ empleado.cedula }}</td>
                        <td>{{ empleado.nombre }}</td>
                        <td>{{ empleado.telefono }}</td>
                        <td>{{ empleado.username }}</td>
                        <td>
                            <div>
                                <q-btn color="primary" style="margin-right: 5px;"
                                    @click="editarEmpleado(empleado)">✏️</q-btn>
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
                        <th>Username</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="empleado in encontrado" :key="empleado">
                        <td>{{ empleado.cedula }}</td>
                        <td>{{ empleado.nombre }}</td>
                        <td>{{ empleado.telefono }}</td>
                        <td>{{ empleado.username }}</td>
                        <td>
                            <div>
                                <q-btn color="primary" style="margin-right: 5px;"
                                    @click="editarEmpleado(empleado)">✏️</q-btn>
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
import { useVendedorStore } from "../stores/vendedores.js"
import { ref } from "vue"

const useVendedor = useVendedorStore()
let cedula = ref("")
let nombre = ref("")
let telefono = ref("")
let username = ref("")
let clave = ref("")

let cc = ref("")
let alert = ref(false)
let data = ref([])
let id = ref("")
let bd = ref("")
let encontrado = ref("")
let busquedaActiva = ref(false)

traer();

function nuevo() {
    bd.value = 1
    vaciar()
}

async function traer() {
    let res = await useVendedor.traerVendedor()
    console.log(res);
    data.value = res.data.empleado
}

async function registrar() {
    let res = await useVendedor.registrarVendedor({
        cedula: cedula.value,
        nombre: nombre.value,
        telefono: telefono.value,
        username: username.value,
        clave: clave.value
    })
    alert.value = false
    vaciar()

    if (data) {
        data.value.push(res.data.empleado);
    }

    if (busquedaActiva.value) {
        const cedulaEmple = cc.value;
        encontrado.value = data.value.filter(item => item.cedula.includes(cedulaEmple));
    }
}

async function buscarCedula() {
    const cedulaEmple = cc.value.trim()
    let res = await useVendedor.traerVendedorCedula(cedulaEmple)

    encontrado.value = data.value.filter((item) =>
        item.cedula.includes(cedulaEmple)
    )
    busquedaActiva.value = true
    return res
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
    console.log(empleado);
}

async function actualizar() {
    const res = await useVendedor.actualizarVendedor(id.value, cedula.value, nombre.value,
        telefono.value, username.value, clave.value)
    console.log(res);

    const indexActualizado = data.value.findIndex((vendedor) => vendedor._id === id.value);
    if (indexActualizado !== -1) {
        data.value[indexActualizado].cedula = cedula.value;
        data.value[indexActualizado].nombre = nombre.value;
        data.value[indexActualizado].telefono = telefono.value;
        data.value[indexActualizado].username = username.value;
        data.value[indexActualizado].clave = clave.value;
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

tbody tr:nth-child(even) {
    background-color: #f2f2f2;
}
</style>
  

  