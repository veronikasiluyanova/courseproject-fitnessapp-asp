import { HttpClient } from '@angular/common/http';
import { FoodType } from '../models/foodtype';
import { Injectable } from '@angular/core';

@Injectable()
export class FoodTypeService {

  private url = "api/FoodTypes";

  constructor(private http: HttpClient) { }

  getFoodTypes() {
    return this.http.get<FoodType[]>(this.url + '/');
  }

  getFoodType(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  createFoodType(newtype: FoodType) {
    return this.http.post(this.url, newtype);
  }

  deleteFoodType(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
