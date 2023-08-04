<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAdminStore } from "../stores/administrador.js";
import axios from "axios"

let email = ref("");
let password = ref("");
let ruta = ref("");
let errores=ref([])
const useAdmin = useAdminStore();
const router = useRouter();

function inicioAdmin() {
 useAdmin.inicio(email.value, password.value)
 .then((res)=>{
  const token = res.data.token;;
            sessionStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        ruta.value = "/infoEmpresa";
      router.push(ruta.value);
  }).catch((error) => {
      if (error.response && error.response.data) {
        console.log(error.response);
        errores.value=error.response.data.errors
      } else {
        console.log(error);
      }
    });
 }
   

</script>