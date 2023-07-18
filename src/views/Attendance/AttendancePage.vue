<template>
    <ion-page>
        <main-menu></main-menu>
        <filter-modal :dates="dates" :showModal="showFilterModal" @closeModal="setFilters"></filter-modal>
        <ion-page id="main-content">
            <ion-header>
                <ion-toolbar color="primary">
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
                <ion-list lines="full">
                    <template v-if="attendances.length > 0">
                        <ion-item-sliding v-for="attendance in attendances">
                            <ion-item>
                                <ion-label class="item-attendance">
                                    <h2><strong>Fecha:</strong> {{ attendance.fecha }} <small>{{ attendance.day }}</small>
                                    </h2>
                                    <ion-chip color="primary" v-for="record in attendance.records">{{ record.fecha_hora
                                    }}</ion-chip>
                                </ion-label>
                            </ion-item>
                            <ion-item-options>
                                <ion-item-option color="warning">
                                    Reportar
                                    <ion-icon :icon="warning" slot="end"></ion-icon>
                                </ion-item-option>
                            </ion-item-options>
                        </ion-item-sliding>
                    </template>
                    <template v-else>
                        <ion-item>
                            <ion-label>No existen registros</ion-label>
                            <ion-icon slot="end" :icon="sad"></ion-icon>
                        </ion-item>
                    </template>

                </ion-list>
                <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
                    <ion-refresher-content></ion-refresher-content>
                </ion-refresher>
            </ion-content>
        </ion-page>

    </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonLabel, IonContent, IonButtons, IonMenuButton, IonRefresher, IonRefresherContent, IonItem, IonList, IonButton, IonIcon, IonChip, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/vue';
import MainMenu from '@/components/MainMenu.vue';
import FilterModal from './FilterModal.vue';
import { filter, sad, warning } from 'ionicons/icons';
import { onBeforeMount, ref } from 'vue';

import moment from 'moment';

moment.locale('es', {
    weekdays: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
})

import { http, showLoading } from '@/common';

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
const attendances = ref<any>([]);


async function setFilters(dates_modal: any) {
    showFilterModal.value = false;

    if (!dates_modal) {
        return;
    }

    dates.value.startDate = dates_modal.dates.startDate;
    dates.value.endDate = dates_modal.dates.endDate;


    getAttendances();
}

const dates = ref({
    startDate: moment().startOf('month').format("Y-MM-DD"),
    endDate: moment().format("Y-MM-DD")
})


async function getAttendances() {
    const loading = await showLoading({ message: 'Cargando datos...' })
    const response = await http({
        endpoint: 'racetime/api/marcaciones', args: {
            dates: dates.value
        }
    });

    attendances.value = response.data.result.map((d: any) => {
        d.records.forEach((rec: any) => {
            rec.fecha_hora = moment(rec.fecha_hora).subtract(5, 'hours').format('HH:mm:ss');
        });
        d.day = moment(d.fecha).format('dddd');
        return d
    });

    loading.dismiss();
}


</script>

<style lang="scss" scoped>
.item-attendance {
    margin-bottom: 0;

    & li {
        margin-left: 2rem;
        font-size: 14px;
    }
}

.attendances {
    margin-top: 0;
}
</style>