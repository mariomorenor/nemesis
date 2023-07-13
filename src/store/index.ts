import { defineStore } from 'pinia';

import { toastController } from '@ionic/vue';

export const useMainStore = defineStore('main', {
    state: () => ({
        login: false,
        server: {
            url: "",
            database: ""
        },
    }),
    actions: {
        async presentToast({ position = 'bottom', message, duration = 1000 }: { position?: 'bottom' | 'middle' | 'top', message: string, duration?: number }) {

            const toast = await toastController.create({
                position,
                message,
                duration
            });

            toast.present();

        }
    }
})