import { defineStore } from "pinia"
import axios from "axios"

export const useClienteStore = defineStore("cliente", () => {
    let data = ""

    const traerCliente = async (info) => {
        try {
            let datos = await axios.get("http://localhost:4506/api/pasajeros", info)
            return datos
        } catch (error) {
            console.log(error);
        }
    }
    const traerPasajeroCedula = async (cedula) => {
        try {
            let datos = await axios.get(`http://localhost:4506/api/pasajeros/${cedula}`, {
                params: { cedula: cedula }
            });
            return datos;
        } catch (error) {
            console.log(error);
        }
    };

    const registrarCliente = async (info) => {
        try {
            let datos = await axios.post("http://localhost:4506/api/pasajeros", info)
            return datos
        } catch (error) {
            console.log(error);
        }
    }

    return {
        traerCliente,
        registrarCliente,
        traerPasajeroCedula
    }
})