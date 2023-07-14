<template>
    <ion-menu content-id="main-content">
        <ion-header>
            <ion-img :src="user_img" ></ion-img>
            <div class="ion-padding">
                <ion-label>{{ user.display_name }}</ion-label>
            </div>
        </ion-header>
        <ion-content class="ion-padding"></ion-content>
    </ion-menu>
</template>

<script lang="ts" setup>
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonLabel, IonItem } from '@ionic/vue';
import { onBeforeMount, onMounted, reactive, ref } from 'vue';

// Storage
import { Storage } from '@ionic/storage';
import { User } from '@/models/models';
const store = new Storage();
let storage: Storage;


// Hooks
onBeforeMount(async () => {
    storage = await store.create();
    user.value = await storage.get('USER');
    user_img.value = `data:image/png;base64,${user.value.avatar_256}`;
});



// Local Store
var user = ref<User>({});
var user_img = ref('/assets/images/profile.png');

</script>