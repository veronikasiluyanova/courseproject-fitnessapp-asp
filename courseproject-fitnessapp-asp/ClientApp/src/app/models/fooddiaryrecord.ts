export class FoodDiaryRecord {
  constructor(
    public id?: number,
    public date_diary?: Date,
    public food_id?: number,
    public gramms?: number,
    public meal_id?: number,
    public user_id?: number,
    public kcal?: number,
    public protein?: number,
    public fats?: number,
    public carbs?: number,
  ) { }
}
