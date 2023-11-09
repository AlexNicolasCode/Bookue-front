export class InvalidFieldError extends Error {
  constructor(private readonly field: string) {
    super(`Invalid ${field}`)
  }
}
