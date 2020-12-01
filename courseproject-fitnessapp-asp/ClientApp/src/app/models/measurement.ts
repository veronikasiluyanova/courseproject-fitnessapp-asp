export class Measurement {
  constructor(
    public id?: number,
    public date_measurement?: Date,
    public weight?: number,
    public height?: number,
    public chest?: number,
    public waist?: number,
    public hip?: number,
    public user_id?: number,
  ) { }
}
