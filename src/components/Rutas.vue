<template>
    <div>
        <div>
            <div class="row">
                <div class="col">
                    <q-btn label="Registrar Ruta" icon="add" color="primary" @click="alert = true; nuevo()" />
                </div>
                <div class="col" style="display: flex;justify-content: flex-end;align-items:center;">
                    <div @click="limpiarBusqueda" style="cursor: pointer;">🗑️</div>
                    <input type="text" placeholder="Nombre de Ruta" v-model="nom">
                    <q-btn label="Buscar" icon="search" color="primary" @click="buscarNombre" />
                </div>
            </div>
        </div><br><br>

        <q-dialog v-model="alert">
            <q-card style="width: 32%;">
                <q-card-section>
                    <div class="text-h6">{{ bd === 0 ? 'Editar Ruta' : 'Registrar Ruta' }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div>
                        <q-input outlined label="Código" v-model="codigoRuta" />
                        <q-input style="margin-top: 10px;" outlined label="Nombre" v-model="nombre" />
                        <q-input style="margin-top: 10px;" outlined label="Origen" v-model="origen" />
                        <q-input style="margin-top: 10px;" outlined label="Destino" v-model="destino" />
                        <q-input style="margin-top: 10px;" type="number" outlined label="Valor" v-model="valor" />
                        <q-input style="margin-top: 10px;" outlined label="Hora de Salida" v-model="hora_salida"
                            type="time" />
                    </div><br>
                    <q-card-actions align="right">
                        <q-btn v-if="bd == 1" style="margin-top: -10px;" label="Guardar" color="primary"
                            @click="registrar" />
                        <q-btn v-else style="margin-top: -10px;" label="Actualizar" color="primary" @click="actualizar" />
                    </q-card-actions>
                </q-card-section>
            </q-card>
        </q-dialog>

        <div class="spinner-container" v-if="useRuta.loading == true">
            <q-spinner style="margin-left: 10px;" color="black" size="5em" :thickness="10" />
        </div>

        <div class="tabla" v-if="!busquedaActiva">
            <table>
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Origen</th>
                        <th>Destino</th>
                        <th>Valor</th>
                        <th>Hora de Salida</th>
                        <th>Estado</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="ruta in data" :key="ruta">
                        <td>{{ ruta.codigoRuta }}</td>
                        <td>{{ ruta.nombre }}</td>
                        <td>{{ ruta.origen }}</td>
                        <td>{{ ruta.destino }}</td>
                        <td>{{ ruta.valor }}</td>
                        <td>{{ ruta.hora_salida }}</td>
                        <td :style="{ color: ruta.estado === 1 ? 'green' : 'red' }">{{ ruta.estado === 1 ? 'Activo'
                            :
                            'Inactivo'
                        }}</td>
                        <td>
                            <div>
                                <q-btn color="primary" style="margin-right: 5px;" @click="editarRuta(ruta)">✏️</q-btn>
                                <q-btn color="primary" style="margin-left: 5px;" @click="estado(ruta)"
                                    v-if="ruta.estado === 1">❌</q-btn>
                                <q-btn color="primary" style="margin-left: 5px;" @click="estado(ruta)" v-else>✅</q-btn>
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
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Origen</th>
                        <th>Destino</th>
                        <th>Valor</th>
                        <th>Hora de Salida</th>
                        <th>Estado</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="ruta in encontrado" :key="ruta">
                        <td>{{ ruta.codigoRuta }}</td>
                        <td>{{ ruta.nombre }}</td>
                        <td>{{ ruta.origen }}</td>
                        <td>{{ ruta.destino }}</td>
                        <td>{{ ruta.valor }}</td>
                        <td>{{ ruta.hora_salida }}</td>
                        <td :style="{ color: ruta.estado === 1 ? 'green' : 'red' }">{{ ruta.estado === 1 ? 'Activo'
                            :
                            'Inactivo'
                        }}</td>
                        <td>
                            <div>
                                <q-btn color="primary" style="margin-right: 5px;" @click="editarRuta(ruta)">✏️</q-btn>
                                <q-btn color="primary" style="margin-left: 5px;" @click="estado(ruta)"
                                    v-if="ruta.estado === 1">❌</q-btn>
                                <q-btn color="primary" style="margin-left: 5px;" @click="estado(ruta)" v-else>✅</q-btn>
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
import { useQuasar } from 'quasar'


const useRuta = useRutaStore()
let codigoRuta = ref("")
let hora_salida = ref("")
let nombre = ref("")
let origen = ref("")
let destino = ref("")
let valor = ref("")

const $q = useQuasar()
let nom = ref("")
let alert = ref(false)
let id = ref("")
let bd = ref("")
let encontrado = ref("")
let busquedaActiva = ref(false)
let data = ref([])
let errores = ref([])

traer();

function nuevo() {
    bd.value = 1
    vaciar()
}

function validarVacios() {
    if (codigoRuta.value === "" && nombre.value === "" && origen.value === "" && destino.value === ""
        && hora_salida.value === "") {
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
}

async function traer() {
    let res = await useRuta.traerRuta()
    console.log(res);
    data.value = res.data.ruta
    data.value.reverse()
}

async function registrar() {
    let res = await useRuta.registrarRuta({
        codigoRuta: codigoRuta.value,
        nombre: nombre.value,
        origen: origen.value,
        destino: destino.value,
        valor: valor.value,
        hora_salida: hora_salida.value
    }).then((res) => {
        alert.value = false
        vaciar()

        if (data) {
            data.value.unshift(res.data.ruta);
        }

        $q.notify({
            message: 'Ruta agregada exitosamente',
            color: 'green',
            position: 'top',
            icon: 'check',
            timeout: Math.random() * 3000
        })

        if (busquedaActiva.value) {
            const nomRuta = nom.value;
            encontrado.value = data.value.filter(item => item.nombre.includes(nomRuta));
        }
    }).catch((error) => {
        if (error.response && error.response.data && validarVacios() === true) {
            errores.value = error.response.data.errors[0].msg
            validar()

        } else {
            console.log(error);
        }
    })
}

async function estado(ruta) {
    console.log(ruta);

    if (ruta.estado === 1) {
        ruta.estado = 0
    } else {
        ruta.estado = 1
    }
    const res = await useRuta.actualizarEstado(ruta._id, ruta.estado)
    console.log(res);
    traer()
}

function limpiarBusqueda() {
    nom.value = ""
    busquedaActiva.value = false
}

async function buscarNombre() {
    if (nom.value.trim() == "") {
        $q.notify({
            message: 'Introduzca el nombre a buscar',
            color: 'red',
            position: 'top',
            icon: 'warning',
            timeout: Math.random() * 3000
        })
    } else {
        const nomRuta = nom.value.trim()
        let res = await useRuta.traerRutaNombre(nomRuta)

        encontrado.value = data.value.filter((item) =>
            item.nombre.includes(nomRuta)
        )
        busquedaActiva.value = true
        return res
    }
}

function vaciar() {
    codigoRuta.value = ""
    nombre.value = ""
    origen.value = ""
    destino.value = ""
    valor.value = ""
    hora_salida.value = ""
}

function editarRuta(ruta) {
    bd.value = 0
    id.value = ruta._id
    codigoRuta.value = ruta.codigoRuta
    nombre.value = ruta.nombre;
    origen.value = ruta.origen;
    destino.value = ruta.destino;
    valor.value = ruta.valor
    hora_salida.value = ruta.hora_salida

    alert.value = true
}


async function actualizar() {
    const res = await useRuta.actualizarRuta(id.value, codigoRuta.value, nombre.value, origen.value, destino.value,
        valor.value, hora_salida.value)
        .then((res) => {
            alert.value = false;
            traer()

            // Actualiza el registro en 'data'
            const indexActualizadoData = data.value.findIndex((rutas) => rutas._id === id.value);
            if (indexActualizadoData !== -1) {
                data.value[indexActualizadoData].codigoRuta = codigoRuta.value;
                data.value[indexActualizadoData].nombre = nombre.value;
                data.value[indexActualizadoData].origen = origen.value;
                data.value[indexActualizadoData].destino = destino.value;
                data.value[indexActualizadoData].valor = valor.value;
                data.value[indexActualizadoData].hora_salida = hora_salida.value;
            }

            $q.notify({
                message: "Ruta editada exitosamente",
                color: 'green',
                position: 'top',
                icon: 'check',
                timeout: Math.random() * 3000
            });

            // Actualiza el registro en 'encontrado', si existe
            const indexActualizadoEncontrado = encontrado.value.findIndex((rutas) => rutas._id === id.value);
            if (indexActualizadoEncontrado !== -1) {
                encontrado.value[indexActualizadoEncontrado].codigoRuta = codigoRuta.value;
                encontrado.value[indexActualizadoEncontrado].nombre = nombre.value;
                encontrado.value[indexActualizadoEncontrado].origen = origen.value;
                encontrado.value[indexActualizadoEncontrado].destino = destino.value;
                encontrado.value[indexActualizadoEncontrado].valor = valor.value;
                encontrado.value[indexActualizadoEncontrado].hora_salida = hora_salida.value;
            }

        }).catch((error) => {
            errores.value = '';
            if (error.response && error.response.data && validarVacios() === true) {
                errores.value = error.response.data.errors[0].msg;
                validar();
            } else {
                console.log(error);
            }
        });

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
  

  
  

  