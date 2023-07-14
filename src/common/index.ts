import { getPlatforms, toastController } from '@ionic/vue';
import { ExceptionCode, CapacitorHttp as Http, HttpOptions, HttpResponse } from '@capacitor/core';

import { Storage } from '@ionic/storage';
const store = new Storage();

export async function http({ service = 'object', method = "execute", args }: { service?: 'common' | 'object', method?: string, args: any }) {
    const isNative = !getPlatforms().includes('desktop');

    const storage = await store.create();
    const server = await storage.get('SERVER');

    if (service == 'object') {
        const user = await storage.get('USER');
        const data = [server.database, user.id, user.password];
        args = data.concat(args);
    }

    const options: HttpOptions = {
        method: 'POST',
        url: isNative ? `${server.url}/jsonrpc` : "/jsonrpc",
        headers: { 'Content-Type': 'application/json' },
        data: {
            jsonrpc: '2.0',
            method: 'call',
            params: {
                service,
                method,
                args
            },
            id: getRandomIntInclusive(1000, 9999)
        }
    }

    try {
        const { data } = await Http.request(options);
        if (!data) {
            throw new Error();
        }
        return data;
    } catch (error:any) {
        return { jsonrpc: '2.0', id: null, error }
    }

}

export async function presentToast({ position = 'bottom', message, duration = 1000 }: { position?: 'bottom' | 'middle' | 'top', message: string, duration?: number }) {

    const toast = await toastController.create({
        position,
        message,
        duration
    });

    toast.present();

}

function getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

