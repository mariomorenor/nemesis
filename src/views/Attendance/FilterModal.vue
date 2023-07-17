<template>
    <ion-modal :is-open="props.showModal">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="cancel()">Cancelar</ion-button>
                </ion-buttons>
                <ion-title>Filtros</ion-title>
                <ion-buttons slot="end">
                    <ion-button :strong="true" @click="confirm()">Confirmar</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-list>
                <ion-item>
                    <ion-label>Fecha Inicio:</ion-label>
                    <ion-datetime-button datetime="start-date"></ion-datetime-button>
                    <ion-modal :show-backdrop="true" :backdrop-dismiss="false" :keep-contents-mounted="true">
                        <ion-datetime v-model="props.dates.startDate" presentation="date" :show-default-buttons="true"
                            done-text="Confirmar" cancel-text="Cancelar" id="start-date"></ion-datetime>
                    </ion-modal>
                </ion-item>
                <ion-item>
                    <ion-label>Fecha Fin:</ion-label>
                    <ion-datetime-button datetime="end-date"></ion-datetime-button>
                    <ion-modal :backdrop-dismiss="false" :keep-contents-mounted="true">
                        <ion-datetime v-model="props.dates.endDate" presentation="date" :show-default-buttons="true"
                            done-text="Confirmar" cancel-text="Cancelar" id="end-date"></ion-datetime>
                    </ion-modal>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-modal>
</template>

<script lang="ts" setup>
import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonDatetimeButton, IonDatetime, IonList } from '@ionic/vue';
import { ref } from 'vue';

const props = defineProps(['showModal', 'dates'])
const emit = defineEmits(['closeModal'])

function cancel() {
    emit('closeModal', false);
}

function confirm() {
    emit('closeModal', { dates: props.dates });

}



</script>