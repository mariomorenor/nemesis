<template>
  <ion-page>
    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu Content</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list lines="full">

          <ion-item router-link="/home" color="primary">
            <ion-label >asdsa</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <ion-page id="main-content">
      <ion-router-outlet></ion-router-outlet>
    </ion-page>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonList, IonTitle, IonToolbar, IonRouterOutlet, IonMenu, IonButtons, IonMenuButton, IonLabel, IonItem } from '@ionic/vue';
import { onBeforeMount, reactive } from 'vue';

// Router
import { useRouter } from 'vue-router';
const router = useRouter();

// Storage
import { Storage } from '@ionic/storage';
const store = new Storage();
let storage: Storage;


// Hooks
onBeforeMount(async () => {
  storage = await store.create();
  const login = await storage.get('LOGIN') ?? false;

  if (!login) {
    router.replace({ name: 'Login' })
  }

  user = await storage.get('USER');

});

let user = reactive({});




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
