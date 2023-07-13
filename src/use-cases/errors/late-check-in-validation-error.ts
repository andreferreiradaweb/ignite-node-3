export class LateCheckInValidationError extends Error {
  constructor() {
    super('The check in can only been validated until 20 minutes of creation')
  }
}
