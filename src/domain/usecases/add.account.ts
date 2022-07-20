export interface AddAccount {
    add: (params: AddAccount.Params) => Promise<AddAccount.Result | undefined>
}

export namespace AddAccount {
    export type Params = {
        name: string
        email: string
        password: string
        passwordConfirmation: string
    }
    export type Result = boolean
}
