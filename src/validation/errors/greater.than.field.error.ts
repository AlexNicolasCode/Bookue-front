export class GreaterThanFieldError extends Error {
  constructor(
    private readonly field: string,
    private readonly comparedField: string
  ) {
    super(`The ${field} field can not be greater than ${comparedField}.`)
  }
}
