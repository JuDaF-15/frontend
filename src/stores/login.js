import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue"

export const useLoginStore = defineStore("login", () => {
  let loading = ref(false)

  const logi = async (usuario, clave) => {
    try {
      loading.value = true
      let datos = await axios.post("http://localhost:4506/api/logins/login",
        { usuario: usuario, clave: clave });
      return datos;
    } catch (error) {
      loading.value = true
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
