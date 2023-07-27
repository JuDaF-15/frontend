<template>
    <div>
      <q-layout view="lHh Lpr lff" container-fluid style="height: 300px" class="shadow-2 rounded-borders">
        <q-header elevated class="bg-cyan-8">
          <q-toolbar>
            <q-toolbar-title>VENTA DE TIQUETES</q-toolbar-title>
            <q-btn flat @click="drawer = !drawer" round dense icon="fa-solid fa-bars" />
          </q-toolbar>
  
        </q-header>
  
        <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="400">
          <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
            <q-list padding>
  
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="fa-solid fa-envelope-circle-check" />
                </q-item-section>
  
                <q-item-section>
                  <router-link to="/clientes">
                    Clientes
                  </router-link>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="fa-solid fa-envelope-circle-check" />
                </q-item-section>
  
                <q-item-section>
                  <router-link to="/tiquete">
                    Tiquetes
                  </router-link>
                </q-item-section>
              </q-item>
  
            </q-list>
          </q-scroll-area>
  
          <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
            <div class="absolute-bottom bg-transparent">
              <q-avatar size="56px" class="q-mb-sm">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
              <div class="text-weight-bold">Razvan Stoenescu</div>
              <div>@rstoenescu</div>
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