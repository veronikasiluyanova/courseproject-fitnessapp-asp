export class Account {
  constructor(
    public username?: string,
    public password?: string,
    public role?: Role
  ) { }
}
export enum Role {
  User,
  Admin
}
