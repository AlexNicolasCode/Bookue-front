import { faker } from "@faker-js/faker"

import { CookieManagerAdapter } from "../cookie"

export class CookieManagerAdapterSpy implements CookieManagerAdapter {
    key: string
    value: string
    result = faker.datatype.string()
    
    async load(key?: string): Promise<string> {
        this.key = key
        return this.result
    }
    
    async set(key: string, value: string): Promise<void> {
        this.key = key        
        this.value = value        
    }  
}
