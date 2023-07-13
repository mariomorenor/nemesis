<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { onBeforeMount } from 'vue';

// Hooks
onBeforeMount(async ()=>{
  await init();
});

// ********************************


// Storage
import { Storage } from '@ionic/storage';
const store = new Storage();

// Global Store
import { useMainStore } from './store/index';
const main = useMainStore();

// Initial Config
async function init() {

  const storage = await store.create();

  const server = await storage.get("SERVER");

  if (server) {
    main.server = server
  }



}



</script>
