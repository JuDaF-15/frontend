import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue"

export const useLoginStore = defineStore("login", () => {
  let loading = ref(false)

  const logi = async (username, clave) => {
    try {
      loading.value = true
      let datos = await axios.post("https://transporte-qdpu.onrender.com/api/logins/login",
        { username: username, clave: clave });
        console.log(datos);
      return datos;
    } catch (error) {
      loading.value = true
      console.log(error);
      throw error
    } finally {
      loading.value = false
    }
  };
  return {
    logi,
    loading
  };
});
