export interface SetCookie {
    set: (key: string, value: string) => Promise<void>
}
