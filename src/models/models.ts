export interface User {
    id?: number,
    display_name?: string,
    email?: string,
    password?: string,
    avatar_256?: string,
    avatar_128?: string,
}

export interface OdooResponse {
    jsonrpc: string,
    id: number,
    error?: any,
    result?: any
}