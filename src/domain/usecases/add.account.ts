export interface AddAccount {
    add: (params: AddAccount.Params) => Promise<boolean>
}

export namespace AddAccount {
    export type Params = {
        name: string
        email: string
        password: string
        passwordConfirmation: string
    }
}