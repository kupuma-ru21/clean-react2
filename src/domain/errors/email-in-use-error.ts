export class EmainInUseError extends Error {
  constructor() {
    super('email error');
    this.name = 'EmainInUseError';
  }
}
