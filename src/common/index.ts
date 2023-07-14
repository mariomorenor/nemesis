import { getPlatforms, toastController } from '@ionic/vue';
import {  CapacitorHttp as Http, HttpOptions } from '@capacitor/core';

import { Storage } from '@ionic/storage';
const store = new Storage();

export async function http({ endpoint, args }: { endpoint: string, args: any, }) {
    const isNative = !getPlatforms().includes('desktop');

    const storage = await store.create();
    const server = await storage.get('SERVER');

    const options: HttpOptions = {
        method: 'POST',
        url: isNative ? `${server.url}${endpoint}` : `/api/${endpoint}`,
        headers: { 'Content-Type': 'application/json' },
        data: {
            id: getRandomInt(1000, 9999),
            params: args,
        }
    }

    const response = await Http.request(options);
    
    if (response.status == 500) {
        return {
            error: {
                message: 'Problemas con el servidor'
            }
        }
    }

    if (response.data.error) {
        return {
            error: response.data.error.data
        }
    }
    
    return response.data



}

export async function presentToast({ position = 'bottom', message, duration = 1000 }: { position?: 'bottom' | 'middle' | 'top', message: string, duration?: number }) {

    const toast = await toastController.create({
        position,
        message,
        duration
    });

    toast.present();

}

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}