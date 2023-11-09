import { CookieManagerAdapter } from '@/infra/cookie'

export const makeCookieManagerAdapter = (): CookieManagerAdapter => new CookieManagerAdapter()
