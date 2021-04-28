import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FoodDiaryRecord } from '../models/fooddiaryrecord';

@Injectable()
export class FoodDiaryService {

  private url = "api/FoodDiaryRecords";

  constructor(private http: HttpClient) { }

  getFoodDiaryRecords() {
    return this.http.get<FoodDiaryRecord[]>(this.url + '/');
  }

  getFoodDiaryRecord(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  createFoodDiaryRecord(newrecord: FoodDiaryRecord) {
    return this.http.post(this.url, newrecord);
  }

  updateFoodDiaryRecord(record: FoodDiaryRecord) {
    return this.http.put(this.url, record);
  }

  deleteFoodDiaryRecord(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  deleteDiaryByUser(user_id: number) {
    return this.http.delete<FoodDiaryRecord>(this.url + '/DeleteDiaryByUser/' + user_id)
  }
}
