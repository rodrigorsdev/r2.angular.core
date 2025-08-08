export abstract class UserAuthenticatedDto {
  constructor(
    public email: string,
    public name: string,
    public token: string,
    public type: string,
  ) { }
}
