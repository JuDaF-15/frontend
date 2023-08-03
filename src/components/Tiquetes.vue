<template>
    <div>
        <div>
            <q-btn label="Registrar Venta" color="primary" @click="alert = true" />
        </div><br><br>

        <q-dialog v-model="alert">
            <q-card style="width: 32%;">
                <q-card-section>
                    <div class="text-h6">Registrar Venta</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div style="width: fit-content;">
                        <select v-model="selectedRuta">
                            <option v-for="option in ruta" :value="option" :key="option">
                                {{ option.nombre }}
                            </option>
                        </select>
                        <select v-model="selectedVehiculo">
                            <option v-for="option in vehiculo" :value="option" :key="option">
                                {{ option.matricula }}
                            </option>
                        </select>
                    </div><br>

                    <q-card-actions align="right">
                        <q-btn style="margin-top: -10px;" label="Guardar" color="primary" @click="guardar()" />
                    </q-card-actions>
                </q-card-section>
            </q-card>
        </q-dialog>

            <q-card class="q-pt-none q-glutter-md q-col-glutter-md" id="card">
                    <img src="licencia-de-conducir.png" v-for="i in selectedVehiculo.capacidad" :key="i" @click="venta(i)" >
            </q-card>


    </div>
</template>

<script setup>
import { ref } from "vue"
import { useVehiculoStore } from "../stores/vehiculos.js"
import { useRutaStore } from "../stores/rutas.js"
import { useClienteStore } from "../stores/clientes.js"

const useVehiculo = useVehiculoStore()
const useRuta = useRutaStore()
const useCliente = useClienteStore()
let selectedRuta = ref("")
let selectedVehiculo = ref("")

let alert = ref(false)
let ruta = ref("")
let vehiculo = ref("")
let puesto = ref()


async function traerInfoRuta() {
    let res = await useRuta.traerRuta()
    console.log(res);
    ruta.value = res.data.ruta
}

traerInfoRuta()

async function traerVehiculo() {
    let res = await useVehiculo.traerVehiculo()
    //console.log(res);
    vehiculo.value = res.data.vehiculo
    console.log(vehiculo.value);
}

traerVehiculo()

function guardar() {
    alert.value = false
}

function venta(i) {
    puesto.value = i
    console.log(puesto.value);

}


</script>

<style scoped>

#card{
    display: grid;
    grid-template-columns: repeat(3,1fr);
}
#card img{
    height: 60%;
    width: 20%;
}
</style>