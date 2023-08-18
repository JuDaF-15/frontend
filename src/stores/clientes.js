import { defineStore } from "pinia"
import axios from "axios"
import { ref } from "vue"

export const useClienteStore = defineStore("cliente", () => {
    let loading = ref(false);

    const traerCliente = async (info) => {
        try {
            loading.value = true
            let datos = await axios.get("https://transporte-qdpu.onrender.com/api/pasajeros", info)
            return datos
        } catch (error) {
            loading.value = true
            console.log(error);
        } finally {
            loading.value = false
        }
    }
    const traerPasajeroCedula = async (cedula) => {
        try {
            let datos = await axios.get(`https://transporte-qdpu.onrender.com/api/pasajeros/${cedula}`, {
                params: { cedula: cedula }
            });
            return datos;
        } catch (error) {
            console.log(error);
            throw error
        }
    };

    const registrarCliente = async (info) => {
        try {
            let datos = await axios.post("https://transporte-qdpu.onrender.com/api/pasajeros", info)
            return datos
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    const actualizarCliente = async (id, cedula, nombre, telefono) => {
        try {
            let datos = await axios.put(`https://transporte-qdpu.onrender.com/api/pasajeros/${id}`, {
                cedula, nombre, telefono
            });
            return datos;
        } catch (error) {
            console.log(error);
            throw error
        }
    };

    const actualizarEstado = async (id, estado) => {
        try {
            let datos = await axios.patch(`https://transporte-qdpu.onrender.com/api/pasajeros/${id}`,
                { estado: estado }
            )
            return datos
        } catch (error) {
            console.log(error);
        }
    }
    return {
        traerCliente,
        registrarCliente,
        traerPasajeroCedula,
        actualizarCliente,
        actualizarEstado,
        loading
    }
})