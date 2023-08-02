<template>
  <div>
    <q-layout view="lHh Lpr lff" container-fluid style="height: 300px" class="shadow-2 rounded-borders">
      <q-header elevated style="background-color: rgba(96, 4, 119, 0.753);">
        <q-toolbar>
          <q-toolbar-title>TRANSPORTES S.A.S</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="fa-solid fa-bars" />
        </q-toolbar>

      </q-header>

      <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="400">
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <i class="fa-solid fa-house fa-xl"></i>
              </q-item-section>

              <q-item-section>
                <router-link to="/homeAdmin" style="text-decoration: none;color: black;">
                  Home
                </router-link>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <i class="fa-regular fa-id-card fa-xl"></i>
              </q-item-section>

              <q-item-section>
                <router-link to="/conductores" style="text-decoration: none;color: black;">
                  Conductores
                </router-link>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <i class="fa-solid fa-cash-register fa-xl"></i>
              </q-item-section>

              <q-item-section>
                <router-link to="/vendedores" style="text-decoration: none;color: black;">
                  Vendedores
                </router-link>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <i class="fa-solid fa-bus fa-xl"></i>
              </q-item-section>

              <q-item-section>
                <router-link to="/vehiculos" style="text-decoration: none;color: black;">
                  Vehículos
                </router-link>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <i class="fa-solid fa-person fa-2xl"></i>
              </q-item-section>

              <q-item-section>
                <router-link to="/clientes" style="text-decoration: none;color: black;">
                  Clientes
                </router-link>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <i class="fa-solid fa-city fa-xl"></i>
              </q-item-section>

              <q-item-section>
                <router-link to="/rutas" style="text-decoration: none;color: black;">
                  Rutas
                </router-link>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <i class="fa-solid fa-ticket fa-xl"></i>
              </q-item-section>

              <q-item-section>
                <router-link to="/tiquetes" style="text-decoration: none;color: black;">
                  Tiquetes
                </router-link>
              </q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v1016-c-08_1-ksh6mza3.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=f584d8501c27c5f649bc2cfce50705c0" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="50px" style="margin-bottom: 10px;" color="orange">J</q-avatar>
            <div class="text-weight-bold">Razvan Stoenescu</div>
            <div>Administrador</div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <router-view></router-view>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { ref } from "vue"
let drawer = ref(false)
</script>

<style lang="scss" scoped></style>
