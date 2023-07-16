<template>
    <ion-menu content-id="main-content">
        <ion-header>
            <ion-avatar class="avatar">
                <img src="/assets/images/avatar.svg" />
            </ion-avatar>
            <div class="ion-padding name-container">
                <ion-label>{{ user.name }}</ion-label>
                <br>
                <ion-button @click="logOut()" fill="clear" size="small"><ion-icon slot="start"
                        :icon="logOutOutline"></ion-icon>Cerrar
                    Sesión</ion-button>
            </div>
        </ion-header>
        <ion-content>
            <ion-list>
                <ion-item @click="goTo(menuItem.routeName)" v-for="menuItem in menuItems" lines="full"
                    :color="router.currentRoute.value.name == menuItem.routeName ? 'primary' : ''">
                    <ion-icon slot="start" :icon="menuItem.icon"></ion-icon>
                    <ion-label><strong> {{ menuItem.label }}</strong></ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-menu>
</template>

<script lang="ts" setup>
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonLabel, IonItem, IonButton, IonIcon, AlertButton, IonList, IonRippleEffect, IonAvatar } from '@ionic/vue';
import { onBeforeMount, onMounted, reactive, ref } from 'vue';
import { home, logOutOutline, menu, time, timeOutline } from 'ionicons/icons';

// Interfaces
import { User } from '@/models/models';

// Common
import { presentAlert } from '@/common/index';

// Router
import router from '@/router';

// Storage
import { Storage } from '@ionic/storage';
const store = new Storage();
let storage: Storage;


// Hooks
onBeforeMount(async () => {
    storage = await store.create();
    user.value = await storage.get('USER');
});



// Local Store
var user = ref<User>({});
var user_img = ref('/assets/images/profile.png');


async function logOut() {

    const buttons: AlertButton[] = [
        {
            text: 'Aceptar',
            handler: async () => {
                await storage.set('LOGIN', false);
                router.replace({ name: 'Login' });
            }
        },
        {
            text: 'Cancelar',
            role: 'cancel'
        }
    ]

    presentAlert({ message: '¿Está Seguro de cerrar la sesión?', buttons });

}

function goTo(route: string) {
    router.replace({
        name: route
    })
}


const menuItems = ref([
    {
        label: 'Asistencias',
        icon: time,
        routeName: 'Attendance'
    },
    {
        label: 'Hi',
        icon: time,
        routeName: 'Home'
    },
])




</script>

<style lang="scss" scoped>
.img-profile {
    width: 45%;
    margin-left: auto;
    margin-right: auto;
    padding-top: 5%;
}

.name-container {
    text-align: center;
    color: black;
}

.avatar {
    margin: 12% auto 6% auto;

    & img {
        transform: scale(1.7);
    }
}
</style>