export interface LoadCookie {
    load: (key: string) => Promise<string | undefined>
}