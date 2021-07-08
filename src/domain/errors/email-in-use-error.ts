export class EmailInUseError extends Error {
  constructor() {
    super('email error');
    this.name = 'EmailInUseError';
  }
}
