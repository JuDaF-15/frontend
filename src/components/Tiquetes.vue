<template>
    <div>
        <div>
            <q-btn label="Registrar Venta" color="primary" @click="alert = true" />
        </div>
        <br /><br />

        <q-dialog v-model="alert">
            <q-card style="width: 32%;">
                <div style="background-color: red;text-align: center;">
                    <span v-if="msj !== ''">
                        {{ msj }}
                    </span>
                </div>

                <q-card-section>
                    <div class="text-h6">Registrar Venta</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div class="select-wrapper">
                        <label>Ruta:</label>
                        <select v-model="selectedRuta" id="rutaSelect">
                            <option v-for="option in ruta" :value="option" :key="option.id">
                                {{ option.nombre }}
                            </option>
                        </select>

                        <label>Vehículo:</label>
                        <select v-model="selectedVehiculo" id="vehiculoSelect">
                            <option v-for="option in vehiculo" :value="option" :key="option.id">
                                {{ option.matricula }}
                            </option>
                        </select>

                        <label>Fecha De Salida:</label>
                        <input type="date" v-model="fechaSalida" :disabled="true">

                        <label>Hora de Salida:</label>
                        <input type="time" v-model="horaSalida">

                    </div>
                    <br />

                    <q-card-actions align="right">
                        <q-btn style="margin-top: -10px;" label="Guardar" color="primary" @click="guardar()" />
                    </q-card-actions>
                </q-card-section>
            </q-card>
        </q-dialog>

        <div class="row" v-if="ok === true">
            <div class="col">
                <div class="card-centrada">
                    <q-card class="q-pt-none q-glutter-md q-col-glutter-md" id="card">
                        <div class="img-wrapper">
                            <div class="img-container" v-for="i in selectedVehiculo.capacidad" :key="i">
                                <span class="seat-number">{{ i }}</span>
                                <img class="asiento" src="asiento.png" @click="venta(i)" />
                            </div>
                        </div>
                    </q-card>
                </div>
            </div>
            <div class="col">
                aquí va el formulario
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from "vue";
import { useVehiculoStore } from "../stores/vehiculos.js";
import { useRutaStore } from "../stores/rutas.js";
import { useClienteStore } from "../stores/clientes.js";

const useVehiculo = useVehiculoStore();
const useRuta = useRutaStore();
const useCliente = useClienteStore();
let selectedRuta = ref("");
let selectedVehiculo = ref("");

let alert = ref(false);
let ruta = ref("");
let vehiculo = ref("");
let cliente = ref("")
let puesto = ref();
let fechaSalida = ref(new Date().toISOString().substr(0, 10));
let horaSalida = ref("")
let msj = ref("")
let ok = ref(false)

async function traerInfoRuta() {
    let res = await useRuta.traerRuta();
    console.log(res);
    ruta.value = res.data.ruta;
}

traerInfoRuta();

async function traerVehiculo() {
    let res = await useVehiculo.traerVehiculo();
    //console.log(res);
    vehiculo.value = res.data.vehiculo;
    console.log(vehiculo.value);
}

traerVehiculo();

async function traerCliente() {
    let res = await useCliente.traerCliente()
    cliente.value = res.data.pasajero
    console.log(cliente.value);
}
traerCliente()

function validar() {
    if (!selectedVehiculo.value) {
        msj.value = "Seleccione el vehiculo"
    } else if (!selectedRuta.value) {
        msj.value = "Seleccione la ruta"
    } else if (!horaSalida.value) {
        msj.value = "Selecciona la hora"
    } else {
        alert.value = false
        return true
    }
    setTimeout(() => {
        msj.value = "";
    }, 2000);
}

function guardar() {
    if (validar() === true) {
        ok.value = true
    }
}

function venta(i) {
    puesto.value = i;
    console.log(puesto.value);
}
</script>
  
<style scoped>
#card {
    border: 2px solid black;
    padding: 10px;
    margin: 0 auto;
    width: fit-content;
    overflow-y: auto;
    max-height: 400px;
    width: 90%;
}

#card img {
    height: 100%;
    width: 30%;
    overflow-y: auto;
    cursor: pointer;
}

.card-centrada {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.img-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}

.asiento {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    max-height: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.img-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
}

.seat-number {
    font-size: 16px;
    font-weight: bold;
    color: #333;
}

.select-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

label {
    font-size: 14px;
    font-weight: bold;
    color: #555;
}

select {
    width: 100%;
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 5px;
    background-color: #f7f7f7;
    font-size: 16px;
    color: #444;
    appearance: none;
}

select:focus {
    outline: none;
    border-color: #2b7ce6;
}

input {
    width: 100%;
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 5px;
    background-color: #f7f7f7;
    font-size: 16px;
    color: #444;
    appearance: none;
}


input:focus {
    outline: none;
    border-color: #2b7ce6;
}
</style>
  