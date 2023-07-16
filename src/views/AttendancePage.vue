<template>
    <ion-page>
        <main-menu></main-menu>
        <ion-page id="main-content">
            <ion-header>
                <ion-toolbar>
                    <ion-buttons>
                        <ion-menu-button></ion-menu-button>
                        <ion-label>Asistencias</ion-label>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <ion-list>
                    <ion-item>
                        <ion-label>Fecha Inicio:</ion-label>
                        <ion-datetime-button datetime="datetime"></ion-datetime-button>

                        <ion-modal :keep-contents-mounted="true">
                            <ion-datetime id="datetime"></ion-datetime>
                        </ion-modal>
                    </ion-item>
                    <ion-item>
                        <ion-label>Fecha Fin</ion-label>
                        <ion-datetime-button datetime="datetime2"></ion-datetime-button>

                        <ion-modal :keep-contents-mounted="true">
                            <ion-datetime id="datetime2"></ion-datetime>
                        </ion-modal>
                    </ion-item>
                </ion-list>

                <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
                    <ion-refresher-content>

                    </ion-refresher-content>
                </ion-refresher>
            </ion-content>
        </ion-page>

    </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonLabel, IonContent, IonButtons, IonMenuButton, IonRefresher, IonRefresherContent, IonCard, IonCardContent, IonItem, IonDatetimeButton, IonModal, IonDatetime, IonList } from '@ionic/vue';
import MainMenu from '@/components/MainMenu.vue';


function handleRefresh(event: any) {

    event.target.complete();
}

</script>