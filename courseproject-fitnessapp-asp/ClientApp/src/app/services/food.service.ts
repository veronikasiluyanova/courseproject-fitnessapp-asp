import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FoodItem } from '../fooditem';

@Injectable()
export class FoodService {

  private url = "api/FoodItems";

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { }

  getFoodItems() {
    return this.http.get<FoodItem[]>(this.url + '/');
  }

  getFoodItem(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  createFoodItem(newitem: FoodItem) {
    return this.http.post(this.baseUrl + this.url, newitem);
  }

  updateFoodItem(item: FoodItem) {
    return this.http.put(this.url, item);
  }

  deleteFoodItem(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
