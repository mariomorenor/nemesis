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
                <ion-input v-model="user.password" :type="passwordReveal ? 'text' : 'password'" label="Contraseña"
                    label-placement="floating"></ion-input>
                <ion-icon @click="passwordReveal = !passwordReveal" slot="end"
                    :icon="passwordReveal ? eyeOff : eye"></ion-icon>
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
import { IonPage, IonContent, IonImg, IonItem, IonInput, IonIcon, IonButton } from '@ionic/vue';
import { person, lockClosed, cog, eye, eyeOff } from 'ionicons/icons';
import { onBeforeMount, reactive, ref } from 'vue';

import { OdooResponse, User } from '@/models/models';
import { http, presentToast } from '@/common/index'

// Hooks
onBeforeMount(async () => {
    storage = await store.create();
    server = await storage.get("SERVER");
    const login = await storage.get('LOGIN');

    if (login) {
        router.replace({ name: 'Home' });
    }

});


// Storage
import { Storage } from '@ionic/storage';
const store = new Storage();
let storage: Storage;

// Router
import { useRouter } from 'vue-router';
const router = useRouter();


const user = reactive({
    email: "stecnico@pucesd.edu.ec",
    password: "825374200M@rio",
});

let server = {
    url: "",
    database: ""
}

const passwordReveal = ref(false);

async function login() {
    const response = await http({
        endpoint: '/web/session/authenticate',
        args: {
            db: server.database,
            login: user.email,
            password: user.password
        }
    });

    const data: OdooResponse = response.data

    if (data.error) {
        presentToast({ message: data.error.message })
        return;
    }

    await storage.set('LOGIN', true);
    await storage.set('USER', Object.assign({}, data.result));

    router.replace({ name: 'Home' });

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