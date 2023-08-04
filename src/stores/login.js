import { defineStore } from "pinia";
import axios from "axios";

export const useLoginStore = defineStore("login", () => {
  let data = "";

  const traerUsuario = async (info) => {
    try {
      let datos = await axios.get("http://localhost:4506/api/logins", info);
      return datos;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    traerUsuario
  };
});
