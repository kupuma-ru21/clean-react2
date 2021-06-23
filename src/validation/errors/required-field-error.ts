export class RequiredFieldError extends Error {
  constructor() {
    super('入力必須です');
    this.name = 'RequiredFieldError';
  }
}
