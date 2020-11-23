import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FoodItem } from '../models/fooditem';

@Injectable()
export class AddFoodItemService {
    private url = "";
    constructor(private http: HttpClient) {
    }

    createFoodItem(newitem: FoodItem) {
        return this.http.post(this.url, newitem);
      }
}
