import {Component, OnInit, Input, Inject} from '@angular/core'
import { FoodService } from '../../services/food.service'
import { Router } from '@angular/router'
import { FoodItem } from '../../models/fooditem'
import { FoodTypeService } from '../../services/foodtype.service'
import { FoodType } from '../../models/foodtype'

@Component({
  selector: 'app-components-add-food-item',
  templateUrl: './add-food-item.component.html',
  styleUrls: ['./add-food-item.component.css']
})

export class AddFoodItemComponent implements OnInit {
  @Input() newfooditem = new FoodItem()
  public foodTypes: FoodType[]
  public error;

  constructor(private foodService: FoodService,
    private router: Router,
    private foodtypeService: FoodTypeService) { }

  ngOnInit(): void {
    this.foodtypeService.getFoodTypes().subscribe(data => {
      this.foodTypes = data
    });
    this.error = false;
  }

  addFoodItemClick() {
    if (this.newfooditem.food_type_id && this.newfooditem.protein && this.newfooditem.fats && this.newfooditem.carbs && this.newfooditem.kcal) {
      this.newfooditem.food_type_id = parseInt(this.newfooditem.food_type_id.toString())
      this.newfooditem.protein = parseFloat(this.newfooditem.protein.toString())
      this.newfooditem.fats = parseFloat(this.newfooditem.fats.toString())
      this.newfooditem.carbs = parseFloat(this.newfooditem.carbs.toString())
      this.newfooditem.kcal = parseFloat(this.newfooditem.kcal.toString())
      this.foodService.createFoodItem(this.newfooditem).subscribe(data => {
        this.router.navigate(["/food-info"])
      })
    }
    else {
      this.error = true;
    }
  }
}
