import { defineStore } from "pinia"
import axios from "axios"
import { ref } from "vue"

export const useRutaStore = defineStore("ruta", () => {
    let loading = ref(false)

    const traerRuta = async (info) => {
        try {
            loading.value = true
            let datos = await axios.get("https://transporte-qdpu.onrender.com/api/rutas", info)
            return datos
        } catch (error) {
            loading.value = true
            console.log(error);
        } finally {
            loading.value = false
        }
    }

    const traerRutaNombre = async (nombre) => {
        try {
            let datos = await axios.get(`https://transporte-qdpu.onrender.com/api/rutas/${nombre}`, {
                params: { nombre: nombre }
            });
            return datos;
        } catch (error) {
            console.log(error);
            throw error
        }
    };

    const registrarRuta = async (info) => {
        try {
            let datos = await axios.post("https://transporte-qdpu.onrender.com/api/rutas", info)
            return datos
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    const actualizarRuta = async (id, codigoRuta, nombre, origen, destino, valor,hora_salida) => {
        try {
            let datos = await axios.put(`https://transporte-qdpu.onrender.com/api/rutas/${id}`, {
                codigoRuta, nombre, origen, destino, valor,hora_salida
            })
            return datos
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    const actualizarEstado = async (id, estado) => {
        try {
            let datos = await axios.patch(`https://transporte-qdpu.onrender.com/api/rutas/${id}`,
                { estado: estado }
            )
            return datos
        } catch (error) {
            console.log(error);
        }
    }

    return {
        traerRuta,
        registrarRuta,
        traerRutaNombre,
        actualizarRuta,
        actualizarEstado,
        loading
    }
})