<template>
    <div>
        <h5 style="text-align: center;">Ventas</h5>
        <div class="tabla">
            <table>
                <thead>
                    <tr>
                        <th>Número</th>
                        <th>Fecha de Venta</th>
                        <th>Fecha de Salida</th>
                        <th>Hora de Salida</th>
                        <th>C.C Pasajero</th>
                        <th>Nombre</th>
                        <th>Vehículo</th>
                        <th>Origen</th>
                        <th>Destino</th>
                        <th>Silla</th>
                        <th>Valor</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="tiquete in ticket" :key="tiquete">
                        <td>{{ tiquete.numero }}</td>
                        <td>{{ tiquete.createdAt }}</td>
                        <td>{{ tiquete.fecha_salida }}</td>
                        <td>{{ tiquete.ruta.hora_salida }}</td>
                        <td>{{ tiquete.cedula_pasajero.cedula }}</td>
                        <td>{{ tiquete.cedula_pasajero.nombre }}</td>
                        <td>{{ tiquete.vehiculo_matricula.matricula }}</td>
                        <td>{{ tiquete.ruta.origen }}</td>
                        <td>{{ tiquete.ruta.destino }}</td>
                        <td>{{ tiquete.num_acientos }}</td>
                        <td>{{ tiquete.ruta.valor }}</td>
                        <td>
                            <div>
                                <q-btn color="primary" style="margin-left: 5px;">✅</q-btn>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
import { useTiqueteStore } from "../stores/tiquetes.js"
import { ref } from "vue"

let ticket = ref("")
const useTiquete = useTiqueteStore()

traerTiquetes()

async function traerTiquetes() {
    let res = await useTiquete.traerTiquete()
    ticket.value = res.data.tikete
    ticket.value.reverse()
    console.log(ticket.value);
}

</script>
<style scoped>
.tabla {
  max-height: 60vh;
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

tbody tr:hover {
  background-color: #1511e018;
  color: black;
  font-weight: bold;
  cursor: pointer;
}
</style>