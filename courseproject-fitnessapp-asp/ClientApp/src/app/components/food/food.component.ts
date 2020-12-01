import { Component, OnInit } from '@angular/core'
import { FoodService } from '../../services/food.service'
import { FoodItem } from '../../models/fooditem'
import { FoodType } from '../../models/foodtype'
import { FoodTypeService } from '../../services/foodtype.service'
import { AuthService } from '../../services/auth.service'

@Component({
    selector: 'app-components-food',
    templateUrl: './food.component.html',
    styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  public allFood: FoodItem[]
  public foodTypes: FoodType[]

  public isAdmin: boolean

  displayedColumns: string[] = ['name', 'food_type_id', 'protein', 'fats', 'carbs', 'kcal']

  constructor(private foodService: FoodService,
    private foodtypeService: FoodTypeService,
    private authService: AuthService) { }

  ngOnInit() {
    this.foodService.getFoodItems().subscribe(data => {
      this.allFood = data
    })
    this.foodtypeService.getFoodTypes().subscribe(data => {
      this.foodTypes = data;
    })
    
  }

}
