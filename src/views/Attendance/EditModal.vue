<template>
    <ion-modal :is-open="props.showModal">
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-button @click="cancel()">
                        <ion-icon :icon="arrowBack"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list lines="full">
                <ion-item>
                    <ion-label>Marcacion:</ion-label>
                    <ion-datetime-button datetime="date"></ion-datetime-button>
                    <ion-modal :backdrop-dismiss="false" :keep-contents-mounted="true">
                        <ion-datetime v-model="d.datetime" id="date" :show-default-buttons="true" done-text="Confirmar"
                            cancel-text="Cancelar"></ion-datetime>
                    </ion-modal>
                </ion-item>
                <ion-item>
                    <ion-button @click="confirm()" slot="end">GUARDAR</ion-button>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-modal>
</template>

<script lang="ts" setup>
import { http } from '@/common';
import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonList, IonItem, IonLabel, IonDatetimeButton, IonDatetime } from '@ionic/vue';
import { arrowBack } from 'ionicons/icons';

import moment from 'moment';
import { onUpdated, ref } from 'vue';

const props = defineProps(['showModal', 'record']);
const emit = defineEmits(['closeModal']);

const d = ref({
    date: "",
    time: "",
    datetime: ""
});

onUpdated(() => {
    changedDate();
})

function changedDate() {
    d.value.date = moment(props.record.punch_time).format("Y-MM-DD");
    d.value.time = moment(props.record.punch_time).format("HH:mm:ss");
    d.value.datetime = `${d.value.date}T${d.value.time}`;
}


function cancel() {
    emit('closeModal', false);
}

function confirm() {
    http({ endpoint: '/api/racetime/actualizar-marcacion', args: { id_marcacion: props.record.id, datetime: d.value.datetime } })
        .then(() => {
            emit('closeModal');
        });
}


</script>