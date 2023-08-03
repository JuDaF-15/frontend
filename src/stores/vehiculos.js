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

    const actualizarVehiculo = async (id, matricula, c, tipo, marca, modelo, capacidad) => {
        try {
            let datos = await axios.put(`http://localhost:4506/api/vehiculos/${id}`, {
                matricula, c, tipo, marca, modelo, capacidad
            })
            return datos
        } catch (error) {
            console.log(error);
        }
    }

    const actualizarEstado = async (id, estado) => {
        try {
            let datos = await axios.patch(`http://localhost:4506/api/vehiculos/${id}`,
                { estado: estado }
            )
            return datos
        } catch (error) {
            console.log(error);
        }
    }

    return {
        traerVehiculo,
        registrarVehiculo,
        traerVehiculoMatricula,
        actualizarVehiculo,
        actualizarEstado
    }
})