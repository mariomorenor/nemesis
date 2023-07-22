<template>
    <ion-page>
        <ion-content class="ion-padding">
            <div class="img-container">
                <img src="/assets/images/nemesis.png" />
            </div>
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

import { OdooResponse } from '@/models/models';
import { http, presentToast, showLoading } from '@/common/index'

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
    email: "",
    password: "",
});

let server = reactive({
    url: "",
    database: ""
})

const passwordReveal = ref(false);

async function login() {

    const loading = await showLoading({ message: 'Iniciando sesión...' });

    server = await storage.get('SERVER');

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
        loading.dismiss();
        return;
    }

    await storage.set('LOGIN', true);
    
    const user_info = await getUserInfo();
    
    
    await storage.set('USER', Object.assign({ password: user.password, email: user.email }, user_info.user_info,user_info.groups, data.result));



    loading.dismiss();

    router.replace({ name: 'Home' });

}

async function getUserInfo() {
    const resp = await http({ endpoint: '/api/user-info', args: {} });
    console.log(resp);
    
    return resp.data.result
}

</script>

<style lang="scss" scoped>
.img-container {
    width: 100vw;
    display: flex;

    & img {
        margin-left: auto;
        margin-right: auto;
        padding-right: 2rem;
    }
}

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