export class InvalidFieldError extends Error {
    constructor () {
      super('Invalid email')
    }
}