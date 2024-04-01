export class OldPasswordNotConference extends Error {
  constructor() {
    super("A senha antiga não confere.");
  }
}
