import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FoodItem } from '../fooditem';

@Injectable()
export class FoodService {

  private url = "/api/FoodItems";

  constructor(private http: HttpClient) {
  }

  getFoodItems() {
    return this.http.get(this.url);
  }

  getFoodItem(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  createFoodItem(product: FoodItem) {
    return this.http.post(this.url, product);
  }
  updateFoodItem(product: FoodItem) {

    return this.http.put(this.url, product);
  }
  deleteFoodItem(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
