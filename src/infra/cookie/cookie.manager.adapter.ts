import { LoadCookie, SetCookie } from '@/data/protocols/cookie'

import cookieManager from 'js-cookie'

export class CookieManagerAdapter implements LoadCookie, SetCookie {
  async load(key?: string): Promise<string | undefined> {
    return cookieManager.get(key as string)
  }

  async set(key: string, value: string): Promise<void> {
    cookieManager.set(key, value)
  }
}
