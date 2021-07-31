export class AccessDeniedError extends Error {
  constructor() {
    super('access denied error');
    this.name = 'AccessDeniedError';
  }
}
