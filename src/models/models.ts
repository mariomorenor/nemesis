export interface User {
    id?: number,
    name?: string,
    email?: string,
    password?: string,
    avatar_1920?: string,
    groups?: Array<String>
}

export interface OdooResponse {
    jsonrpc: string,
    id: number,
    error?: any,
    result?: any
}

export interface Biometric {
    id: number,
    name: string,
    ip_address: string,
    state?: boolean
}