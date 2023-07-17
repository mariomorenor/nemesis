<template>
    <ion-page>
        <main-menu></main-menu>
        <filter-modal :dates="dates" :showModal="showFilterModal" @closeModal="setFilters"></filter-modal>
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
                <ion-list>
                    <ion-item v-for="attendace in attendaces">
                        <ion-label><strong>Marcación:</strong> {{ attendace.fecha_hora }}</ion-label>
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
import { IonPage, IonHeader, IonToolbar, IonLabel, IonContent, IonButtons, IonMenuButton, IonRefresher, IonRefresherContent, IonCard, IonCardContent, IonItem, IonDatetimeButton, IonModal, IonDatetime, IonList, IonButton, IonIcon, IonPopover } from '@ionic/vue';
import MainMenu from '@/components/MainMenu.vue';
import FilterModal from './FilterModal.vue';
import { filter } from 'ionicons/icons';
import { onBeforeMount, ref } from 'vue';

import moment from 'moment';
import { OdooResponse } from '@/models/models';
import { http } from '@/common';


// Hooks
onBeforeMount(() => {
    getAttendances();
})


function handleRefresh(event: any) {


    getAttendances().then(() => {
        event.target.complete();
    });

}

// Local Store

var showFilterModal = ref(false);
const attendaces = ref<any>([]);


function setFilters(dates_modal: any) {
    showFilterModal.value = false;

    dates.value.startDate = dates_modal.dates.startDate;
    dates.value.endDate = dates_modal.dates.endDate;


    getAttendances();
}

const dates = ref({
    startDate: moment().startOf('month').format("Y-MM-DD"),
    endDate: moment().format("Y-MM-DD")
})


async function getAttendances() {
    const response = await http({
        endpoint: 'racetime/api/marcaciones', args: {
            dates: dates.value
        }
    });
    console.log(response.data);

    attendaces.value = [...response.data.result]
}


</script>