import { defineStore } from "pinia"
import axios from "axios"
import { ref } from "vue"

export const useVehiculoStore = defineStore("vehiculo", () => {
    let loading = ref(false);

    const traerVehiculo = async (info) => {
        try {
            loading.value = true
            let datos = await axios.get("https://transporte-qdpu.onrender.com/api/vehiculos", info)
            return datos
        } catch (error) {
            loading.value = true
            console.log(error);
        } finally {
            loading.value = false
        }
    }

    const traerVehiculoMatricula = async (matricula) => {
        try {
            let datos = await axios.get(`https://transporte-qdpu.onrender.com/api/vehiculos/${matricula}`, {
                params: { matricula: matricula }
            });
            return datos;
        } catch (error) {
            console.log(error);
            throw error
        }
    };

    const registrarVehiculo = async (info) => {
        try {
            let datos = await axios.post("https://transporte-qdpu.onrender.com/api/vehiculos", info)
            return datos
        } catch (error) {
            console.log(error);
            throw (error);
        }
    }

    const actualizarVehiculo = async (id, matricula, numero, chofer_id, tipo, marca, modelo, capacidad) => {
        try {
            let datos = await axios.put(`https://transporte-qdpu.onrender.com/api/vehiculos/${id}`, {
                matricula, numero, chofer_id, tipo, marca, modelo, capacidad
            })
            return datos
        } catch (error) {
            console.log(error);
            throw (error);
        }
    }

    const actualizarEstado = async (id, estado) => {
        try {
            let datos = await axios.patch(`https://transporte-qdpu.onrender.com/api/vehiculos/${id}`,
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
        actualizarEstado,
        loading
    }
})