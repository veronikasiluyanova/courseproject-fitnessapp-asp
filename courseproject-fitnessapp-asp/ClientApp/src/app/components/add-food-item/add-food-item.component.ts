import {Component, OnInit, Input, Inject} from '@angular/core'
import { FoodService } from '../../services/food.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { FoodItem } from '../../fooditem'
import { Router } from '@angular/router'

@Component({
  selector: 'app-components-add-food-item',
  templateUrl: './add-food-item.component.html',
  styleUrls: ['./add-food-item.component.css']
})
export class AddFoodItemComponent implements OnInit {
  @Input() newfooditem = new FoodItem()

  addFoodItemForm: FormGroup

  constructor(private foodService: FoodService,
    private fb: FormBuilder,
    private router: Router,
    @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit(): void {
  //  this.addFoodItemForm = this.fb.group({
  //    id:[],
  //    name: [null, Validators.required],
  //    food_type_id: [null, Validators.required],
  //    protein: [null, Validators.required],
  //    fats: [null, Validators.required],
  //    carbs: [null, Validators.required],
  //    kcal: [null, Validators.required]
  //  })
    }

  addFoodItemClick() {
    this.foodService.createFoodItem(this.newfooditem);
    console.log("Add.  " + this.newfooditem)
  }

  onSubmit() {
    this.foodService.createFoodItem(this.addFoodItemForm.value).subscribe(data => {
      this.router.navigate(["/food-info"])
    })
  }
}
