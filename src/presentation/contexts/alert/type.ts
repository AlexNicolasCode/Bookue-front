export enum AlertType {
    error = 'error',
    warn = 'warn',
    succeds = 'succeds',
}

export type AlertProps = {
    text: string
    type: AlertType
}