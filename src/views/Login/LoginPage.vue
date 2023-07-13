<template>
    <ion-page>
        <ion-content class="ion-padding">
            <ion-img src="assets/images/nemesis.png"></ion-img>
            <ion-item>
                <ion-icon slot="start" :icon="person"></ion-icon>
                <ion-input v-model="user.email" label="Usuario" label-placement="floating"></ion-input>
            </ion-item>
            <ion-item>
                <ion-icon :icon="lockClosed" slot="start"></ion-icon>
                <ion-input v-model="user.password" label="Contraseña" label-placement="floating"></ion-input>
            </ion-item>
            <div class="login-button-container">
                <ion-button @click="login()">Iniciar Sesión</ion-button>
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

// Router
import { useRouter } from 'vue-router';
const router = useRouter();

// Global Store
import { useMainStore } from '@/store/index';
const main = useMainStore();


// Local Store
const user = {
    email: "",
    password: ""
}

async function login() {
    main.http({ service: 'common', method: 'login', args: [main.server.database, user.email, user.password] })
}



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