import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useConductorStore = defineStore("chofer", () => {
  let loading = ref(false);

  const traerConductor = async (info) => {
    try {
      loading.value = true
      let datos = await axios.get("https://transporte-qdpu.onrender.com/api/choferes", info);
      return datos;
    } catch (error) {
      loading.value = true
      console.log(error);
    } finally {
      loading.value = false
    }
  };

  const traerConductorCedula = async (cedula) => {
    try {
      let datos = await axios.get(`https://transporte-qdpu.onrender.com/api/choferes/${cedula}`, {
        params: { cedula: cedula }
      });
      return datos;
    } catch (error) {
      throw error
    }
  };

  const registrarConductor = async (info) => {
    try {
      let datos = await axios.post("https://transporte-qdpu.onrender.com/api/choferes", info);
      return datos;
    } catch (error) {
      throw error
    }
  };

  const actualizarConductor = async (id, cedula, nombre, telefono, numero_licencia,
    categoria_licencia, fecha_vencimiento, experiencia) => {
    try {
      let datos = await axios.put(`https://transporte-qdpu.onrender.com/api/choferes/${id}`, {
        cedula, nombre, telefono, numero_licencia,
        categoria_licencia, fecha_vencimiento, experiencia
      });
      return datos;
    } catch (error) {
      throw error
    }
  };

  const actualizarEstado = async (id,estado) => {
    try{
      let datos = await axios.patch(`https://transporte-qdpu.onrender.com/api/choferes/${id}`,
      {estado:estado}
      )
      return datos
    } catch (error){
      console.log(error);
    }
  }

  return {
    traerConductor,
    registrarConductor,
    traerConductorCedula,
    actualizarConductor,
    actualizarEstado,
    loading
  };
});
