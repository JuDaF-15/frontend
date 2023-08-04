import { defineStore } from "pinia";
import axios from "axios";

export const useLoginStore = defineStore("login", () => {
  const log = async (usuario, clave) => {
    try {
      let datos = await axios.post("http://localhost:4506/api/logins/login",
        { usuario: usuario, clave: clave });
      return datos;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    log
  };
});
