import {Component} from '@angular/core'

@Component({
    selector: 'app-components-add-food-item',
    templateUrl: './add-food-item.component.html',
    styleUrls: ['./add-food-item.component.css']
})
export class AddFoodItemComponent {
    add_food_item(newitem){
        console.log(newitem)
    }
}
