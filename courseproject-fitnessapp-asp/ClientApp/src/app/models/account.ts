import { Guid } from "guid-typescript";

export class Account {
  constructor(
   // public id?: Guid,
    public id?: string,
    public username?: string,
    public password?: string,
    public role?: Role,
    public email?: string,
    public confirmed?: boolean
  ) { }
}
export enum Role {
  User,
  Admin
}
