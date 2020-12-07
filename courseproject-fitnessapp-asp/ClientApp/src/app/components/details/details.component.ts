import { Component, OnInit } from "@angular/core";
import { FoodDiaryRecord } from "../../models/fooddiaryrecord";
import { FoodDiaryService } from "../../services/fooddiary.service";
import { ID } from "../../services/auth.service";
import { MatDatepickerInputEvent } from "@angular/material";
import { DatePipe } from "@angular/common";
import { FoodService } from "../../services/food.service";
import { FoodItem } from "../../models/fooditem";

@Component({
  selector: 'details',
  templateUrl: './details.component.html',
  styles: ['./details.component.css'],
  providers: [DatePipe]
})
export class DetailsComponent implements OnInit {

  public currentdate: Date;
  user_id: number;
  public allRecords: FoodDiaryRecord[];
  public breakfast: FoodDiaryRecord[]; public lunch: FoodDiaryRecord[]; public dinner: FoodDiaryRecord[]; public snack: FoodDiaryRecord[];
  displayedColumns: string[] = ['food_id', 'gramms', 'kcal', 'protein', 'fats', 'carbs', 'action'];

  foodmap = new Map();

  constructor(
    private foodDiaryService: FoodDiaryService,
    private foodService: FoodService,
    private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.user_id = +localStorage.getItem(ID);
    this.foodService.getFoodItems().subscribe(data => {
      data.forEach(f => {
        this.foodmap.set(f.id, f.name);
      });
    });
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.currentdate = event.value;
    this.foodDiaryService.getFoodDiaryRecords().subscribe(data => {
      this.allRecords = data.filter(r => r.user_id === this.user_id).filter(rr => this.datepipe.transform(rr.date_diary, 'yyyy-MM-dd') === this.datepipe.transform(this.currentdate, 'yyyy-MM-dd'));
      console.log(this.allRecords);
    
    this.breakfast = this.allRecords.filter(r => r.meal_id === 1);
    this.lunch = this.allRecords.filter(r => r.meal_id === 2);
    this.dinner = this.allRecords.filter(r => r.meal_id === 3);
    this.snack = this.allRecords.filter(r => r.meal_id === 4);
    });
  }

  deleteRecord(id: number, meal: number) {
    if (confirm('Вы действительно хотите удалить запись?')) {
      switch (meal) {
        case 1:
          this.breakfast = this.breakfast.filter(b => b.id !== id);
          break;
        case 2:
          this.lunch = this.lunch.filter(b => b.id !== id);
          break;
        case 3:
          this.dinner = this.dinner.filter(b => b.id !== id);
          break;
        case 4:
          this.snack = this.snack.filter(b => b.id !== id);
          break;
      }
      this.foodDiaryService.deleteFoodDiaryRecord(id).subscribe();
    }
  }
}
