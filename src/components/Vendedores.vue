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
                        <q-input style="margin-top: 10px;" label="Contraseña" v-model="clave" filled type="password" />

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
                        <th>Documento</th>
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
import { useVendedorStore } from "../stores/vendedores.js"
import { ref } from "vue"

const useVendedor = useVendedorStore()
let documento = ref("")
let nombre = ref("")
let telefono = ref("")
let username = ref("")
let clave = ref("")

let alert = ref(false)
let data = ref([])

traer();

async function traer() {
    let res = await useVendedor.traerVendedor()
    console.log(res);
    data.value = res.data.empleado
}

async function registrar() {
    let res = await useVendedor.registrarVendedor({
        cedula: documento.value,
        nombre: nombre.value,
        telefono: telefono.value,
        username: username.value,
        clave: clave.value
    })

    if (data) {
        data.value.push(res.data.empleado);
    }
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
  

  