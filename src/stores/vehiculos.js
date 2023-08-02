import { defineStore } from "pinia"
import axios from "axios"

export const useVehiculoStore = defineStore("vehiculo", () => {
    let data = ""

    const traerVehiculo = async (info) => {
        try {
            let datos = await axios.get("http://localhost:4506/api/vehiculos", info)
            return datos
        } catch (error) {
            console.log(error);
        }
    }

    const traerVehiculoMatricula = async (matricula) => {
        try {
            let datos = await axios.get(`http://localhost:4506/api/vehiculos/${matricula}`, {
                params: { matricula: matricula }
            });
            return datos;
        } catch (error) {
            console.log(error);
        }
    };

    const registrarVehiculo = async (info) => {
        try {
            let datos = await axios.post("http://localhost:4506/api/vehiculos", info)
            return datos
        } catch (error) {
            console.log(error);
        }
    }

    return {
        traerVehiculo,
        registrarVehiculo,
        traerVehiculoMatricula
    }
})