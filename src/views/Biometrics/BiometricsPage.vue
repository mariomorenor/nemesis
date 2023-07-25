<template>
    <ion-page>
        <main-menu></main-menu>
        <ion-page id="main-content">
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-buttons slot="start">
                        <ion-menu-button></ion-menu-button>
                        <ion-label v-show="!showSearchBar">Biometricos</ion-label>
                        <ion-searchbar v-model="searching" @ionInput="handleInput($event)"
                            v-show="showSearchBar"></ion-searchbar>
                    </ion-buttons>
                    <ion-buttons slot="end">
                        <ion-button @click="showSearchBar = !showSearchBar">
                            <ion-icon slot="icon-only" :icon="search"></ion-icon>
                        </ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <ion-list lines="full">
                    <ion-item v-for="biometric in biometrics">
                        <ion-button :disabled="!biometric.state" color="success" @click="openDoor(biometric)" slot="start">
                            <ion-icon :icon="lockOpenSharp"></ion-icon>
                        </ion-button>
                        <ion-label>
                            <h2>{{ biometric.name }}</h2>
                            <p>{{ biometric.ip_address }}</p>
                        </ion-label>

                    </ion-item>
                </ion-list>
                <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
                    <ion-refresher-content></ion-refresher-content>
                </ion-refresher>
            </ion-content>
        </ion-page>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonLabel, IonContent, IonButtons, IonMenuButton, IonRefresher, IonRefresherContent, IonList, IonItem, IonButton, IonIcon, IonSearchbar } from '@ionic/vue'

import MainMenu from '@/components/MainMenu.vue';
import { onBeforeMount, ref } from 'vue';
import { http } from '@/common';
import { OdooResponse, Biometric } from '@/models/models';
import { lockOpenSharp, open, search } from 'ionicons/icons';


onBeforeMount(async () => {

    getBiometrics();


});


var biometrics = ref<Biometric[]>();
var biometrics_copy = ref<Biometric[]>();
var showSearchBar = ref(false);
var searching = ref("")

function handleRefresh(event: any) {

    getBiometrics().finally(() => {
        event.target.complete();
    })
}


function openDoor(bio: Biometric) {
    bio.state = false;


    http({ endpoint: '/api/biometricos/open', args: { biometrico_id: bio.id } })
        .finally(() => {
            bio.state = true;
        })

}

async function getBiometrics() {
    const resp = await http({ endpoint: '/api/biometricos', args: [] });

    const data: OdooResponse = resp.data;

    if (data.error) {
        return
    }

    biometrics.value = data.result.map((b: Biometric) => Object.assign({ state: true }, b));
    biometrics_copy.value = data.result.map((b: Biometric) => Object.assign({ state: true }, b));

}

function handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    biometrics.value = biometrics_copy.value?.filter((b) => b.name.includes(query))
}

</script>