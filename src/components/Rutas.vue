<template>
    <div>
        <div>
            <input type="text" v-model="nombre" placeholder="nombre" style="width: fit-content;">
            <input type="text" v-model="origen" placeholder="origen" style="width: fit-content;">
            <input type="text" v-model="destino" placeholder="destino" style="width: fit-content;">
            <input type="number" v-model="valor" placeholder="valor" style="margin-top: 10px;width: fit-content;">
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
import { useRutaStore } from "../stores/rutas.js"
import { ref } from "vue"

const useRuta = useRutaStore()
let nombre = ref("")
let origen = ref("")
let destino = ref("")
let valor = ref("")
let data = ref([])

traer();

async function traer() {
    let res = await useRuta.traerRuta()
    console.log(res);
    data.value = res.data.ruta
}

async function registrar() {
    let res = await useRuta.registrarRuta({
        nombre : nombre.value,
        origen: origen.value,
        destino: destino.value,
        valor: valor.value,
    })

    if (data) {
        data.value.push(res.data.ruta);
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
  

  
  

  