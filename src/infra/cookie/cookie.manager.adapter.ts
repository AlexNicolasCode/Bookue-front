import { LoadCookie, SetCookie } from "@/data/protocols/cookie";

import cookieManager from "js-cookie";

export class CookieManagerAdapter implements LoadCookie, SetCookie {
    async load (key: string): Promise<string> {
        return cookieManager.get(key)
    }

    async set (key: string, value: string): Promise<void> {
        cookieManager.set(key, value)
    }
}