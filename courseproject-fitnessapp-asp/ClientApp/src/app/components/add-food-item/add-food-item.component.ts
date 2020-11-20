import {Component} from '@angular/core'

@Component({
    selector: 'add-food-item',
    templateUrl: './add-food-item.component.html'
})
export class AddFoodItemComponent {
    add_food_item(newitem){
        console.log(newitem)
    }
}