<template>
  <div>
    <div class="container">
      <div class="avatar">
        <img src="avatar.png" alt="Avatar" />
      </div>
      <h3>Login</h3>
      <form id="admin-login-form">
        <p>
          <i class="input-icon fas fa-user"></i> Usuario
          <input type="text" class="input-with-icon" v-model="user" />
        </p>
        <p>
          <i class="input-icon fas fa-lock"></i> Contraseña
          <input type="password" class="input-with-icon" v-model="contrasena" />
        </p>
        <p>
          <router-link to="/homeAdmin">
            <button class="log" type="submit">Ingresar</button>
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

let usuario = ref({
  username: "admin",
  clave: "admin12345"
})

let user = ref("")
let contrasena = ref("")

onMounted(() => {
  user.value = usuario.value.username;
  contrasena.value = usuario.value.clave;
});

</script>

<style scoped>
.container {
  width: 400px;
  max-height: fit-content;
  margin: 40px auto;
  padding: 12px;
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
