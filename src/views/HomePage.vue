<template>
  <ion-page>
    <main-menu></main-menu>
    <ion-page id="main-content">
      posi
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

onMounted(() => {

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
