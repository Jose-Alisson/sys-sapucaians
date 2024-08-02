import { AdditionalManager } from "./additionalManager.model"

export declare interface Product{
    id: number | undefined | null
    name: string 
    description: string 
    price: number 
    category: string | undefined | null
    additional: AdditionalManager[]
}