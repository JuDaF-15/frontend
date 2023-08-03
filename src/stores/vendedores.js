import { defineStore } from "pinia"
import axios from "axios"

export const useVendedorStore = defineStore("vendedor", () => {
    let data = ""

    const traerVendedor = async (info) => {
        try {
            let datos = await axios.get("http://localhost:4506/api/empleados", info)
            return datos
        } catch (error) {
            console.log(error);
        }
    }

    const traerVendedorCedula = async (cedula) => {
        try {
            let datos = await axios.get(`http://localhost:4506/api/empleados/${cedula}`, {
                params: { cedula: cedula }
            });
            return datos;
        } catch (error) {
            console.log(error);
        }
    };

    const registrarVendedor = async (info) => {
        try {
            let datos = await axios.post("http://localhost:4506/api/empleados", info)
            return datos
        } catch (error) {
            console.log(error);
        }
    }

    const actualizarVendedor = async (id, cedula, nombre, telefono, username, clave) => {
        try {
            let datos = await axios.put(`http://localhost:4506/api/empleados/${id}`, {
                cedula, nombre, telefono, username, clave
            });
            return datos;
        } catch (error) {
            console.log(error);
        }
    };
    const actualizarEstado = async (id, estado) => {
        try {
            let datos = await axios.patch(`http://localhost:4506/api/empleados/${id}`,
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
        actualizarEstado
    }
})