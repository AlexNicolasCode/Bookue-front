export class UnexpectedError extends Error {
  constructor() {
    super('Something happened. Try again later')
    this.name = 'UnexpectedError'
  }
}
