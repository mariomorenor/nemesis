<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { onBeforeMount } from 'vue';

// Storage
import { Storage } from '@ionic/storage';
const store = new Storage();
let storage: Storage;

// Init

function init(arr: { key: string, value: any }[], storageKeys: string[]) {
  arr.forEach(async (item) => {
    if (!storageKeys.includes(item.key)) {
      await storage.set(item.key, item.value);
    }
  })
}

// Hooks
onBeforeMount(async () => {
  storage = await store.create();

  const keys: string[] = await storage.keys();

  init(values, keys);

});

// Local Store 'Add local inital keys to set in storage'
const values = [
  {
    key: 'SERVER',
    value: {
      url: 'https://unitec.pucesd.edu.ec',
      database: 'pucesd'
    }
  },
  {
    key: 'LOGIN',
    value: false
  },
  {
    key: 'USER',
    value: {}
  }

];



</script>
