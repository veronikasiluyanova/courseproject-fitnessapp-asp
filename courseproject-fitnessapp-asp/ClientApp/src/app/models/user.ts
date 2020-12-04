import { Guid } from "guid-typescript";

export class User {
  constructor(
    public id?: number,
   // public account_id?: Guid,
    public account_id?: string,
    public email?: string,
    public username?: string,
    public gender?: string,
    public birthday?: Date,
    public goal_id?: number,
    public start_weight?: number,
    public goal_weight?: number,
    public height?: number,
    public activity?: number,
    public protein_norm?: number, 
    public fats_norm?: number, 
    public carbs_norm?: number, 
    public kcal_norm?: number,
    public water_norm?: number
  ) { }
}
