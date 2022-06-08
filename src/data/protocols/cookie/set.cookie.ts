export interface SetCookie {
    set: (key: string, value) => Promise<string>
}