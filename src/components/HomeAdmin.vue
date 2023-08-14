<template>
  <div>
    <div class="q-pa-md row items-start q-gutter-md" id="cards">
      <div class="mostrar">
        <q-card style="background-color: rgb(201, 225, 248);width: 200px;text-align: center;">
          <q-card-section>
            Conductores
          </q-card-section>
          <div style="display: flex; justify-content: center;">
            <router-link to="/conductores">
              <img src="imagenes/licencia-de-conducir.png" style="width: 100px; height: 100px;">
            </router-link>
          </div>
        </q-card>

        <q-card style="background-color: rgb(201, 225, 248);width: 200px;text-align: center;">
          <q-card-section>
            Vendedores
          </q-card-section>
          <div style="display: flex; justify-content: center;">
            <router-link to="/vendedores">
              <img src="imagenes/vendedora.png" style="width: 100px; height: 100px;">
            </router-link>
          </div>
        </q-card>

        <q-card style="background-color: rgb(201, 225, 248);width: 200px;text-align: center;">
          <q-card-section>
            Vehículos
          </q-card-section>
          <div style="display: flex; justify-content: center;">
            <router-link to="/vehiculos">
              <img src="imagenes/autobus.png" style="width: 100px; height: 100px;">
            </router-link>
          </div>
        </q-card>

        <q-card style="background-color: rgb(201, 225, 248);width: 200px;text-align: center;">
          <q-card-section>
            Rutas
          </q-card-section>
          <div style="display: flex; justify-content: center;">
            <router-link to="/rutas">
              <img src="imagenes/ruta.png" style="width: 100px; height: 100px;">
            </router-link>
          </div>
        </q-card>

        <q-card style="background-color: rgb(201, 225, 248);width: 200px;text-align: center;">
          <q-card-section>
            Clientes
          </q-card-section>
          <div style="display: flex; justify-content: center;">
            <router-link to="/clientes">
              <img src="imagenes/clientes.png" style="width: 100px; height: 100px;">
            </router-link>
          </div>
        </q-card>

        <q-card style="background-color: rgb(201, 225, 248);width: 200px;text-align: center;">
          <q-card-section>
            Tiquetes
          </q-card-section>
          <div style="display: flex; justify-content: center;">
            <router-link to="/tiquetes">
              <img src="imagenes/factura.png" style="width: 100px; height: 100px;">
            </router-link>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>
  
<style scoped>
#cards {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.mostrar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 100px;
}
</style>
  