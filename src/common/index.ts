import { AlertButton, alertController, getPlatforms, loadingController, toastController } from '@ionic/vue';
import { CapacitorHttp as Http, HttpOptions, HttpResponse, CapacitorCookies } from '@capacitor/core';

import { Storage } from '@ionic/storage';
const store = new Storage();

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

export async function http({ endpoint, args }: { endpoint: string, args: any, }): Promise<HttpResponse> {
    const isNative = !getPlatforms().includes('desktop');

    const storage = await store.create();
    const server = await storage.get('SERVER');

    const options: HttpOptions = {
        method: 'POST',
        url: isNative ? `${server.url}${endpoint}` : `${window.location.origin}/api${endpoint}`,
        headers: { 'Content-Type': 'application/json', "Accept": "application/json" },
        data: {
            id: getRandomInt(1000, 9999),
            params: args,
        },
    }

    const response = await Http.request(options);

    if (response.status == 500) {
        return {
            data: {
                error: {
                    message: 'Problemas con el servidor'
                }
            },
            status: response.status,
            headers: response.headers,
            url: response.url
        }
    }

    if (response.data.error) {
        return {
            data: {
                error: response.data.error.data
            },
            status: response.status,
            headers: response.headers,
            url: response.url
        }
    }

    return response

}

export async function presentToast({ position = 'bottom', message, duration = 1000 }: { position?: 'bottom' | 'middle' | 'top', message: string, duration?: number }) {

    const toast = await toastController.create({
        position,
        message,
        duration
    });

    toast.present();

}

export async function presentAlert({ message, buttons = [] }: { message: string, buttons: AlertButton[] }) {

    const alert = await alertController.create({
        message,
        buttons
    });

    return await alert.present();
}

export async function showLoading({ message, duration = 0 }: { message: string, duration?: number }) {
    const loading = await loadingController.create({
        message,
        duration,
    })

    loading.present();
    return loading
}