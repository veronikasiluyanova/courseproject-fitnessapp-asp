import { Component, OnInit } from '@angular/core'
import { FoodItem } from '../../fooditem'
import { FoodService } from '../../services/food.service'

@Component({
    selector: 'app-components-food',
    templateUrl: './food.component.html',
    styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  public allFood: FoodItem[]

  constructor(private foodService: FoodService) { }

  ngOnInit() {
    this.foodService.getFoodItems().subscribe(data => {
      this.allFood = data
    })
  }

  foodTypes = { 1: 'Овощи', 2: 'Фрукты', 3: 'Молочные продукты' }
  displayedColumns: string[] = ['name', 'food_type_id', 'protein', 'fats', 'carbs', 'kcal']
}
