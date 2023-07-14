export interface User {
    id?: number,
    name?: string,
    email?: string,
    password?: string,
}

export interface OdooResponse {
    jsonrpc: string,
    id: number,
    error?: any,
    result?: any
}