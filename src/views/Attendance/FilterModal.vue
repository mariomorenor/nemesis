<template>
    <ion-modal :is-open="showModal">
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

        </ion-content>
    </ion-modal>
</template>

<script lang="ts" setup>
import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonItem, IonLabel, IonInput } from '@ionic/vue';
import { ref } from 'vue';

const props = defineProps(['showModal'])
const emit = defineEmits(['closeModal'])

function cancel() {
    emit('closeModal', false);
}

function confirm() {
    emit('closeModal', true)

}


</script>