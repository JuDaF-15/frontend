<template>
  <div>
    <div class="container">
      <h2>Login</h2>
      <form id="admin-login-form">
        <p>
          <i class="input-icon fas fa-user"></i> Usuario
          <input type="text" class="input-with-icon" />
        </p>
        <p>
          <i class="input-icon fas fa-lock"></i> Contraseña
          <input type="password" class="input-with-icon" />
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


</script>

<style>
.container {
  width: 450px;
  max-width: fit-content;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f7f7f7;
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
