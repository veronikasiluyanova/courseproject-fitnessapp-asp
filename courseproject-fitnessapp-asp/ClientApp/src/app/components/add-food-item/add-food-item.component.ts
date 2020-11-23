import {Component, OnInit, Input, Inject} from '@angular/core'
import { FoodService } from '../../services/food.service'
import { FormGroup, FormBuilder } from '@angular/forms'
import { FoodItem } from '../../fooditem'
import { Router } from '@angular/router'

@Component({
  selector: 'app-components-add-food-item',
  templateUrl: './add-food-item.component.html',
  styleUrls: ['./add-food-item.component.css']
})
export class AddFoodItemComponent implements OnInit {
  @Input() newfooditem = new FoodItem()

  constructor(private foodService: FoodService,
    private fb: FormBuilder,
    private router: Router,
    @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit(): void { }

  addFoodItemClick() {
    this.newfooditem.food_type_id = parseInt(this.newfooditem.food_type_id.toString())
    this.newfooditem.protein = parseFloat(this.newfooditem.protein.toString())
    this.newfooditem.fats = parseFloat(this.newfooditem.fats.toString())
    this.newfooditem.carbs = parseFloat(this.newfooditem.carbs.toString())
    this.newfooditem.kcal = parseFloat(this.newfooditem.kcal.toString())
    this.foodService.createFoodItem(this.newfooditem).subscribe(data => {
      this.router.navigate(["/food-info"])
    });
    console.log("Add.  " + this.newfooditem)
  }

  
}
