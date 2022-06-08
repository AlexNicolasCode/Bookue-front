import { LoadCookie } from "@/data/protocols/cookie";

import cookieManager from "js-cookie";

export class CookieManagerAdapter implements LoadCookie {
    async load (key: string): Promise<string> {
        return cookieManager.get(key)
    }
}