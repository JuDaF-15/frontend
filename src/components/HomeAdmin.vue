<template>
    <div>
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card style="background-color: rgb(227, 239, 250);width: 200px;text-align: center;">
          <q-card-section>
            Conductores
          </q-card-section>
          <div style="display: flex; justify-content: center;">
            <router-link to="/conductores">
              <img src="licencia-de-conducir.png" style="width: 100px; height: 100px;">
            </router-link>
          </div>
        </q-card>

        <q-card style="background-color: rgb(227, 239, 250);width: 200px;text-align: center;">
          <q-card-section>
            Vendedores
          </q-card-section>
          <div style="display: flex; justify-content: center;">
            <router-link to="/vendedores">
              <img src="licencia-de-conducir.png" style="width: 100px; height: 100px;">
            </router-link>
          </div>
        </q-card>



      </div>
    </div>
  </template>
  
  <style scoped>
  </style>
  