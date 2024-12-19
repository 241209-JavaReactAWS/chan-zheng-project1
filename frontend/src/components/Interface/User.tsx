import {Item} from './Item'

export interface User{
    userId: number,
    username: string,
    password: string,
    role: "USER" | "ADMIN",
    favorites: Item[]
}