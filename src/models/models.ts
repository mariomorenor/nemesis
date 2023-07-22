export interface User {
    id?: number,
    name?: string,
    email?: string,
    password?: string,
    avatar_1920?: string
}

export interface OdooResponse {
    jsonrpc: string,
    id: number,
    error?: any,
    result?: any
}