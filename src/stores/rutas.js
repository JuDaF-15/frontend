import { defineStore } from "pinia"
import axios from "axios"

export const useRutaStore = defineStore("ruta", () => {
    let data = ""

    const traerRuta = async (info) => {
        try {
            let datos = await axios.get("http://localhost:4506/api/rutas", info)
            return datos
        } catch (error) {
            console.log(error);
        }
    }

    const traerRutaNombre = async (nombre) => {
        try {
            let datos = await axios.get(`http://localhost:4506/api/rutas/${nombre}`, {
                params: { nombre: nombre }
            });
            return datos;
        } catch (error) {
            console.log(error);
        }
    };

    const registrarRuta = async (info) => {
        try {
            let datos = await axios.post("http://localhost:4506/api/rutas", info)
            return datos
        } catch (error) {
            console.log(error);
        }
    }

    const actualizarRuta = async (id, nombre, origen, destino, valor) => {
        try {
            let datos = await axios.put(`http://localhost:4506/api/rutas/${id}`, {
                nombre, origen, destino, valor
            })
            return datos
        } catch (error) {
            console.log(error);
        }
    }

    const actualizarEstado = async (id, estado) => {
        try {
            let datos = await axios.patch(`http://localhost:4506/api/rutas/${id}`,
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
        actualizarEstado
    }
})