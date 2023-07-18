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
                        <ion-datetime id="date" v-model="date" :show-default-buttons="true" done-text="Confirmar"
                            cancel-text="Cancelar"></ion-datetime>
                    </ion-modal>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-modal>
</template>

<script lang="ts" setup>
import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonList, IonItem, IonLabel, IonDatetimeButton, IonDatetime } from '@ionic/vue';
import { arrowBack } from 'ionicons/icons';

import moment from 'moment';
import { ref } from 'vue';

const props = defineProps(['showModal','record']);
const emit = defineEmits(['closeModal']);
console.log(moment().format('Y-MM-DD HH:mm'));

const d = moment().format('Y-MM-DDTHH:mm');
var date = ref(d);

function cancel() {
    emit('closeModal', false);
}

function confirm() {
    emit('closeModal');
}


</script>