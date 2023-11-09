import { faker } from '@faker-js/faker'

import { LoadCookie } from '@/data/protocols/cookie'

export class LoadCookieSpy implements LoadCookie {
  key: string
  value: string
  result = faker.datatype.string()

  async load(key?: string): Promise<string> {
    this.key = key
    return this.result
  }
}
