export class UnexpectedError extends Error {
  constructor() {
    super('Algo de errado acounteceu. Tente novaente em breve.');
    this.name = 'UnexpectedError';
  }
}
