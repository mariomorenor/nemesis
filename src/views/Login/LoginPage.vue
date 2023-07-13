<template>
    <ion-page>
        <ion-content class="ion-padding">
            <ion-img src="assets/images/nemesis.png"></ion-img>
            <ion-item>
                <ion-icon slot="start" :icon="person"></ion-icon>
                <ion-input label="Usuario" label-placement="floating"></ion-input>
            </ion-item>
            <ion-item>
                <ion-icon :icon="lockClosed" slot="start"></ion-icon>
                <ion-input label="Contraseña" label-placement="floating"></ion-input>
            </ion-item>
            <div class="login-button-container">
                <ion-button>Iniciar Sesión</ion-button>
            </div>
            <div class="footer ion-padding">
                <ion-button :router-link="{ name: 'Config' }" size="small" color="dark">
                    <ion-icon :icon="cog"></ion-icon>
                </ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonContent, IonImg, IonItem, IonInput, IonIcon, IonButton, IonRouterOutlet } from '@ionic/vue';
import { person, lockClosed, cog } from 'ionicons/icons';

import { useRouter } from 'vue-router';
const router = useRouter();


</script>

<style lang="scss" scoped>
.login-button-container {
    display: flex;
    margin-top: 10px;
    justify-content: center;
}

.footer {
    position: absolute;
    bottom: 0;
    right: 0;
}
</style>