import { defineStore } from "pinia"
import axios from "axios"
import { ref } from "vue"

export const useVendedorStore = defineStore("vendedor", () => {
    let loading = ref(false);

    const traerVendedor = async (info) => {
        try {
            loading.value = true
            let datos = await axios.get("https://transporte-qdpu.onrender.com/api/empleados", info)
            return datos
        } catch (error) {
            loading.value = true
            console.log(error);
        } finally {
            loading.value = false
        }
    }

    const traerVendedorCedula = async (cedula) => {
        try {
            let datos = await axios.get(`https://transporte-qdpu.onrender.com/api/empleados/${cedula}`, {
                params: { cedula: cedula }
            });
            return datos;
        } catch (error) {
            console.log(error)
            throw error
        }
    };

    const registrarVendedor = async (info) => {
        try {
            let datos = await axios.post("https://transporte-qdpu.onrender.com/api/empleados", info)
            return datos
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    const actualizarVendedor = async (id, cedula, nombre, telefono, username, clave) => {
        try {
            let datos = await axios.put(`https://transporte-qdpu.onrender.com/api/empleados/${id}`, {
                cedula, nombre, telefono, username, clave
            });
            return datos;
        } catch (error) {
            console.log(error);
            throw error
        }
    };
    const actualizarEstado = async (id, estado) => {
        try {
            let datos = await axios.patch(`https://transporte-qdpu.onrender.com/api/empleados/${id}`,
                { estado: estado }
            )
            return datos
        } catch (error) {
            console.log(error);
        }
    }

    return {
        traerVendedor,
        registrarVendedor,
        traerVendedorCedula,
        actualizarVendedor,
        actualizarEstado,
        loading
    }
})