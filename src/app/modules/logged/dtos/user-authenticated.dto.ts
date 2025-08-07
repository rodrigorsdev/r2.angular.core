export abstract class UserAuthenticatedDto {
  constructor(
    public email: string,
    public token: string,
    public type: string,
  ) { }
}
