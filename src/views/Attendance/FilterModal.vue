<template>
    <ion-modal :is-open="props.showModal">
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-button @click="cancel()">Cancelar</ion-button>
                </ion-buttons>
                <ion-title>Filtros</ion-title>
                <ion-buttons slot="end">
                    <ion-button :strong="true" @click="confirm()">Confirmar</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list lines="full">
                <ion-item>
                    <ion-label>Fecha Inicio:</ion-label>
                    <ion-datetime-button datetime="start-date"></ion-datetime-button>
                    <ion-modal :show-backdrop="true" :backdrop-dismiss="false" :keep-contents-mounted="true">
                        <ion-datetime v-model="props.dates.startDate" @ion-change="changeDate()" :max="maxDate"
                            presentation="date" :show-default-buttons="true" done-text="Confirmar" cancel-text="Cancelar"
                            id="start-date"></ion-datetime>
                    </ion-modal>
                </ion-item>
                <ion-item>
                    <ion-label>Fecha Fin:</ion-label>
                    <ion-datetime-button datetime="end-date"></ion-datetime-button>
                    <ion-modal :backdrop-dismiss="false" :keep-contents-mounted="true">
                        <ion-datetime v-model="props.dates.endDate" @ion-change="changeDate()" :min="minDate"
                            presentation="date" :show-default-buttons="true" done-text="Confirmar" cancel-text="Cancelar"
                            id="end-date"></ion-datetime>
                    </ion-modal>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-modal>
</template>

<script lang="ts" setup>
import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonDatetimeButton, IonDatetime, IonList } from '@ionic/vue';
import moment from 'moment';
import { ref } from 'vue';

const props = defineProps(['showModal', 'dates'])
const emit = defineEmits(['closeModal'])

function cancel() {
    emit('closeModal', false);
}

function confirm() {
    emit('closeModal', { dates: props.dates });
}


var minDate = ref(moment().startOf('month').format('Y-MM-DD'));
var maxDate = ref(moment().format('Y-MM-DD'));

function changeDate() {

    minDate = props.dates.startDate;
    maxDate = props.dates.endDate;
}


</script>