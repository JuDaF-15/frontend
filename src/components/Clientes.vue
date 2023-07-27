<template>
    <div>
        <div>
            <input type="text" v-model="documento" placeholder="documento" style="width: fit-content;">
            <input type="text" v-model="nombre" placeholder="nombre" style="width: fit-content;">
            <input type="text" v-model="telefono" placeholder="telefono" style="margin-top: 10px;width: fit-content;">
        </div><br>

        <div>
            <button @click="registrar()">
                guardar
            </button>
        </div><br>

        <div>
            <table>
                <thead>
                    <tr>
                        <th>Documento</th>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cliente in data" :key="cliente">
                        <td>{{ cliente.cedula }}</td>
                        <td>{{ cliente.nombre }}</td>
                        <td>{{ cliente.telefono }}</td>
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
let documento = ref("")
let nombre = ref("")
let telefono = ref("")
let data = ref([])

traer();

async function traer() {
    let res = await useCliente.traerCliente()
    console.log(res);
    data.value = res.data.cliente
}

async function registrar() {
    let res = await useCliente.registrarCliente({
        cedula: documento.value,
        nombre: nombre.value,
        telefono: telefono.value,
    })

    if (data) {
        data.value.push(res.data.cliente);
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
    width: 50%;
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
  

  