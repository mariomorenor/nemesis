import { defineStore } from 'pinia';

import { getPlatforms, isPlatform, toastController } from '@ionic/vue';
import { CapacitorHttp as Http, HttpOptions } from '@capacitor/core';

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

        },
        async http({ service = 'object', method, args }: { service?: 'common' | 'object', method: string, args: any }) {
            const isNative = !getPlatforms().includes('desktop');

            const options: HttpOptions = {
                method: 'POST',
                url: isNative ? `${this.server.url}/jsonrpc` : "/jsonrpc",
                headers: { 'Content-Type': 'application/json' },
                data: {
                    jsonrpc: '2.0',
                    method: 'call',
                    params: {
                        service,
                        method,
                        args
                    }
                }
            }

            const response = await Http.request(options);
            console.log(response);


        }
    }
})