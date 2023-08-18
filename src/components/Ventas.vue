<template>
    <div>
        <div class="spinner-container" v-if="useTiquete.loading == true">
            <q-spinner style="margin-left: 10px;" color="black" size="5em" :thickness="10" />
        </div>
        <div class="row">
            <div class="col">
            </div>
            <div class="col" style="display: flex;justify-content: flex-end;align-items:center ;">
                <div @click="limpiarBusqueda" style="cursor: pointer;">🗑️</div>
                <input type="number" placeholder="Número de Tiquete" v-model="num">
                <q-btn label="Buscar" icon="search" color="primary" @click="buscarTiquete()" />
            </div>
        </div><br><br>
        <h5 style="text-align: center;margin-top: -15px;">Ventas</h5>

        <div class="tabla" v-if="!busquedaActiva">
            <table>
                <thead>
                    <tr>
                        <th>Número de Tiquete</th>
                        <th>Cédula Vendedor</th>
                        <th>Nombre Vendedor</th>
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
                        <td>{{ tiquete.empleado.cedula }}</td>
                        <td>{{ tiquete.empleado.nombre }}</td>
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
                                <q-btn color="primary" @click="generarTiquete(tiquete)">🖨️</q-btn>
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
                        <th>Número de Tiquete</th>
                        <th>Cédula Vendedor</th>
                        <th>Nombre Vendedor</th>
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
                    <tr v-for="tiquete in encontrado" :key="tiquete">
                        <td>{{ tiquete.numero }}</td>
                        <td>{{ tiquete.empleado.cedula }}</td>
                        <td>{{ tiquete.empleado.nombre }}</td>
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
                                <q-btn color="primary" @click="generarTiquete(tiquete)">🖨️</q-btn>
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
import { useQuasar } from "quasar"
import jsPDF from "jspdf";


let ticket = ref("")
let num = ref("")
const useTiquete = useTiqueteStore()
const $q = useQuasar()
let busquedaActiva = ref(false)
let encontrado = ref("")

traerTiquetes()

async function traerTiquetes() {
    let res = await useTiquete.traerTiquete()
    ticket.value = res.data.tikete
    ticket.value.reverse()
}

function generarTiquete(tiquete) {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a6'
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Tiquete de Venta", doc.internal.pageSize.getWidth() / 2, 15, { align: "center" });

    doc.setFont("helvetica", "normal");

    doc.setFontSize(12);
    doc.text(`Número: ${tiquete.numero}`, 10, 30);
    doc.text(`Origen: ${tiquete.ruta.origen}`, 10, 40);
    doc.text(`Destino: ${tiquete.ruta.destino}`, 10, 50);
    doc.text(`Vehículo: ${tiquete.vehiculo_matricula.matricula} / ${tiquete.vehiculo_matricula.numero} `, 10, 60);
    doc.text(`Fecha de Salida: ${tiquete.fecha_salida}`, 10, 70);
    doc.text(`Hora de Salida: ${tiquete.ruta.hora_salida}`, 10, 80);

    doc.setLineWidth(0.5);
    doc.line(10, 90, doc.internal.pageSize.getWidth() - 10, 90);

    doc.setFontSize(12);
    doc.text(`Pasajero: ${tiquete.cedula_pasajero.nombre}`, 10, 100);
    doc.text(`Cédula: ${tiquete.cedula_pasajero.cedula}`, 10, 110);
    doc.text(`Teléfono: ${tiquete.cedula_pasajero.telefono}`, 10, 120);
    doc.text(`Asiento: ${tiquete.num_acientos}`, 10, 130);
    doc.text(`Valor: ${tiquete.ruta.valor}`, 10, 140);

    doc.save("tiquete.pdf");
}

async function buscarTiquete() {
    if (num.value == "") {
        $q.notify({
            message: 'Introduzca el número a buscar',
            color: 'red',
            position: 'top',
            icon: 'warning',
            timeout: Math.random() * 3000
        })
    } else {
        const numeroTiquete = num.value.toString()
        await useTiquete.traerTiqueteNumero(numeroTiquete)
            .then((res) => {
                encontrado.value = ticket.value.filter((item) =>
                    item.numero.includes(numeroTiquete)
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

function limpiarBusqueda() {
    num.value = ""
    busquedaActiva.value = false
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