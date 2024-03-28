export class ConsumerAlreadyExistsError extends Error {
  constructor() {
    super('Esse cliente ja existe');
  }
}
