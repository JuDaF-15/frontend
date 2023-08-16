import { defineStore } from "pinia"
import axios from "axios"
import { ref } from "vue"


export const useTiqueteStore = defineStore("tiquete", () => {
    let loading = ref(false);

    const traerTiquete = async (info) => {
        try {
            loading.value = true
            let datos = await axios.get("http://localhost:4506/api/tiketes", info)
            return datos
        } catch (error) {
            loading.value = true
            console.log(error);
        } finally{
            loading.value = false
        }
    }
    const traerTiqueteNumero = async (numero) => {
        try {
            let datos = await axios.get(`http://localhost:4506/api/tiketes/${numero}`, {
                params: { numero: numero }
            });
            return datos;
        } catch (error) {
            console.log(error);
            throw error
        }
    };

    const postTiquete = async (info) => {
        try {
            let datos = await axios.post("http://localhost:4506/api/tiketes", info)
            return datos
        } catch (error) {
            return error
        }
    }

    return {
        traerTiquete, postTiquete,traerTiqueteNumero,loading
    }
})