import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WaterDiaryRecord } from '../models/waterdiaryrecord';

@Injectable()
export class WaterDiaryService {

  private url = "api/WaterDiaryRecords";

  constructor(private http: HttpClient) { }

  getWaterDiaryRecords() {
    return this.http.get<WaterDiaryRecord[]>(this.url + '/');
  }

  getWaterDiaryRecord(id: number) {
    return this.http.get<WaterDiaryRecord>(this.url + '/' + id);
  }

  getTodayWater(user_id: number) {
    return this.http.get<WaterDiaryRecord>(this.url + '/GetTodayWater/' + user_id);
  }

  createWaterDiaryRecord(newrecord: WaterDiaryRecord) {
    return this.http.post(this.url, newrecord);
  }

  updateWaterDiaryRecord(id: number, record: WaterDiaryRecord) {
    return this.http.put(this.url + '/' + id, record);
  }

  deleteWaterDiaryRecord(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  deleteWaterDiaryByUser(user_id: number) {
    return this.http.delete<WaterDiaryRecord>(this.url + '/DeleteWaterDiaryByUser/' + user_id)
  }
}
