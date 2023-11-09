export class InvalidUserError extends Error {
  constructor() {
    super('Invalid user. Please, check if your email and password is correct.')
    this.name = 'InvalidUserError'
  }
}
