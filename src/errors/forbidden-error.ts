export class ForbiddenError extends Error {
  constructor() {
    super('Acesso negado');
  }
}
