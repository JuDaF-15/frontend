<template>
    <div>
        <div>
            <q-btn label="Registrar Vendedor" color="primary" @click="alert = true" />
        </div><br><br>

        <q-dialog v-model="alert">
            <q-card style="width: 32%;">
                <q-card-section>
                    <div class="text-h6">Registrar Vendedor</div>
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
let encontrado = ref("")
let busquedaActiva = ref(false)

traer();

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
    text-align: center;
    border-collapse: collapse;
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
  

  