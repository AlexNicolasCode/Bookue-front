export enum AlertType {
  Error = 'error',
  Warn = 'warn',
  Succeds = 'succeds',
}

export enum AlertMessage {
  GenericError = 'internal error. Please, try again later',
}

export type AlertProps = {
  text: AlertMessage | string
  type: AlertType
}
