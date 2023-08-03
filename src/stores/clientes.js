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

    const actualizarCliente = async (id, cedula, nombre, telefono) => {
        try {
            let datos = await axios.put(`http://localhost:4506/api/pasajeros/${id}`, {
                cedula, nombre, telefono
            });
            return datos;
        } catch (error) {
            console.log(error);
        }
    };

    const actualizarEstado = async (id, estado) => {
        try {
            let datos = await axios.patch(`http://localhost:4506/api/pasajeros/${id}`,
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
        actualizarEstado
    }
})