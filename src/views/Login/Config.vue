<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons>
                    <ion-back-button></ion-back-button>
                    <ion-title>Configuración</ion-title>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-item>
                <ion-icon slot="start" :icon="link"></ion-icon>
                <ion-input v-model="server.url" label="Servidor" label-placement="floating"></ion-input>
            </ion-item>
            <ion-item>
                <ion-icon slot="start" :icon="serv"></ion-icon>
                <ion-input v-model="server.database" slot="start" label="Base de datos"
                    label-placement="floating"></ion-input>
            </ion-item>
            <br>
            <ion-button @click="saveConfig()" expand="full"><ion-icon slot="start" :icon="save"></ion-icon>
                Guardar</ion-button>
        </ion-content>
    </ion-page>
</template>


<script setup lang="ts">
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonItem, IonInput, IonIcon, IonButton } from '@ionic/vue';
import { server as serv, link, save } from 'ionicons/icons';
import { onMounted, reactive } from 'vue';


import { presentToast } from '@/common';

// Hooks

onMounted(async () => {
    storage = await store.create();
});

// ************************ //

// Storage
import { Storage } from '@ionic/storage';
const store = new Storage();
let storage: Storage;

// Local Store
const server = reactive({
    url: '',
    database: ''
});


// Save config
async function saveConfig() {
    storage.set("SERVER", Object.assign({}, server));

    presentToast({ message: "Guardado con Éxito!" });

}


</script>

<style scoped lang="scss"></style>