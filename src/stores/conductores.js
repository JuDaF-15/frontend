import { defineStore } from "pinia"
import axios from "axios"

export const useConductorStore = defineStore("chofer", () => {
    let data = ""

    const traerConductor = async (info) => {
        try {
            let datos = await axios.get("http://localhost:4506/api/choferes", info)
            return datos
        } catch (error) {
            console.log(error);
        }
    }

    const traerConductorCedula = async (cedula) => {
        try {
            let datos = await axios.get(`http://localhost:4506/api/choferes/${cedula}`, {
                params: { cedula: cedula }
            })
            return datos
        } catch (error) {
            console.log(error);
        }
    }

    const registrarConductor = async (info) => {
        try {
            let datos = await axios.post("http://localhost:4506/api/choferes", info)
            return datos
        } catch (error) {
            console.log(error);
        }
    }

    return {
        traerConductor,
        registrarConductor,
        traerConductorCedula
    }
})