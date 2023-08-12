export enum AlertType {
    error = 'alert',
    warn = 'warn',
    succeds = 'warn',
}

export type AlertProps = {
    text: string
    type: AlertType
}