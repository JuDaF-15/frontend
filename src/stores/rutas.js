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

    return {
        traerRuta,
        registrarRuta,
        traerRutaNombre
    }
})