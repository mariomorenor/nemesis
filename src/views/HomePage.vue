<template>
  <ion-page>
    <main-menu></main-menu>
    <ion-page id="main-content">
      <ion-header :translucent="true">
        <ion-toolbar color="primary">
          <ion-buttons>
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Blank</ion-title>
          </ion-toolbar>
        </ion-header>

        <div id="container">
          <strong>Bienvenido!</strong>
          <p>Por favor, seleccione una opción del menú lateral</p>
        </div>
      </ion-content>
    </ion-page>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonList, IonTitle, IonToolbar, IonRouterOutlet, IonMenu, IonButtons, IonMenuButton, IonLabel, IonItem } from '@ionic/vue';
import { onBeforeMount, onMounted, reactive } from 'vue';
import MainMenu from '@/components/MainMenu.vue';

// Router
import { useRouter } from 'vue-router';
const router = useRouter();

// Storage
import { Storage } from '@ionic/storage';
import { http } from '@/common';
import { OdooResponse } from '@/models/models';
const store = new Storage();
let storage: Storage;


// Hooks
onBeforeMount(async () => {
  storage = await store.create();
  const login = await storage.get('LOGIN') ?? false;

  if (!login) {
    router.replace({ name: 'Login' })
  }

  const server = await storage.get('SERVER');
  const user = await storage.get('USER');

  await http({
    endpoint: '/web/session/authenticate',
    args: {
        db: server.database,
        login: user.email,
        password: user.password
    }
});


});


</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
