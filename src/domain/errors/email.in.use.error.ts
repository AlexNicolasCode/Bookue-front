export class EmailInUseError extends Error {
  constructor() {
    super('Email is already used')
    this.name = 'EmailInUseError'
  }
}
