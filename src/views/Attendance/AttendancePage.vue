<template>
    <ion-page>
        <main-menu></main-menu>
        <filter-modal :showModal="showFilterModal" @closeModal="setFilters"></filter-modal>
        <ion-page id="main-content">
            <ion-header>
                <ion-toolbar>
                    <ion-buttons>
                        <ion-menu-button></ion-menu-button>
                        <ion-label>Asistencias</ion-label>
                    </ion-buttons>
                    <ion-buttons slot="end">
                        <ion-button @click="showFilterModal = true">
                            <ion-icon slot="icon-only" :icon="filter"></ion-icon>
                        </ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <ion-card>
                    <ion-card-content>

                    </ion-card-content>
                </ion-card>

                <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
                    <ion-refresher-content>

                    </ion-refresher-content>
                </ion-refresher>
            </ion-content>
        </ion-page>

    </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonLabel, IonContent, IonButtons, IonMenuButton, IonRefresher, IonRefresherContent, IonCard, IonCardContent, IonItem, IonDatetimeButton, IonModal, IonDatetime, IonList, IonButton, IonIcon, IonPopover } from '@ionic/vue';
import MainMenu from '@/components/MainMenu.vue';
import FilterModal from './FilterModal.vue';
import { filter } from 'ionicons/icons';
import { ref } from 'vue';

function handleRefresh(event: any) {

    event.target.complete();
}

// Local Store

var showFilterModal = ref(false);



function setFilters(values: any) {
    showFilterModal.value = false;

}

</script>