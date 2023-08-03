import { defineStore } from "pinia"
import axios from "axios"

export const useTiqueteStore = defineStore("tiquete", () => {
    let data = ""

    const traerTiquete = async (info) => {
        try {
            let datos = await axios.get("http://localhost:4506/api/tiketes", info)
            return datos
        } catch (error) {
            console.log(error);
        }
    }

    return {
        traerTiquete
    }
})