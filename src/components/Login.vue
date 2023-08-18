<template>
  <div>
    <div class="container">
      <div class="avatar">
        <img src="../imagenes/avatar.png" alt="Avatar" />
      </div>
      <h3>Login</h3>
      <form id="admin-login-form">
        <p>
          <i class="input-icon fas fa-user"></i> Usuario
          <input type="text" class="input-with-icon" v-model="username" />
        </p>
        <p>
          <i class="input-icon fas fa-lock"></i> Contraseña
          <input type="password" class="input-with-icon" v-model="clave" />
        </p>
        <p>
          <button class="log" @click="iniciarSesion()">
            <span class="button-text">Ingresar</span>
            <q-spinner style="margin-left: 10px;" color="white" size="2em" :thickness="10"
              v-if="useLogin.loading === true" />
          </button>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useLoginStore } from "../stores/login.js"
import { useQuasar } from 'quasar'

let useLogin = useLoginStore()
let router = useRouter();
let ruta = ref("")
let username = ref("");
let clave = ref("");
const $q = useQuasar()

function validar() {
  if (username.value === "" && clave.value === "") {
    $q.notify({
      message: 'Campos vacíos',
      color: 'red',
      icon: 'warning',
      position: 'top',
      timeout: Math.random() * 3000
    })
  } else return true
}

async function iniciarSesion() {
  useLogin.logi(username.value, clave.value)
    .then((res) => {
      const token = res.data.token;
      sessionStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      ruta.value = "/homeAdmin";
      router.push(ruta.value);
      console.log(token);
    }).catch((error) => {
      if (error.response && error.response.data.errors && validar() === true) {

        const camposVacios = error.response.data.errors[0].msg

        $q.notify({
          message: camposVacios,
          color: 'red',
          icon: 'warning',
          position: 'top',
          timeout: Math.random() * 3000
        })
      } else if (error.response && error.response.data.mensaje) {
        const credencialesInvalidas = error.response.data.mensaje

        $q.notify({
          message: credencialesInvalidas,
          color: 'red',
          position: 'top',
          icon: 'warning',
          timeout: Math.random() * 3000
        })

      } else {
        console.log(error);
      }
    })
}


</script>

<style scoped>
.container {
  width: 380px;
  height: auto;
  margin: 20px auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f7f7f7;
  text-align: center;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid black;
  overflow: hidden;
  margin: 0 auto 20px;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

h2 {
  text-align: center;
}

input {
  width: 100%;
  height: 35px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.log {
  width: 100%;
  padding: 10px;
  background-color: #2b7ce6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>