import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Measurement } from "../models/measurement";

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {
  private url = "api/Measurements";
  constructor(private http: HttpClient) { }

  addMeasurement(newmeasurement: Measurement) {
    return this.http.post(this.url, newmeasurement);
  }

  getMeasurements() {
    return this.http.get<Measurement[]>(this.url + '/');
  }

  getMeasurement(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  getCurrent(user_id: number) {
    return this.http.get<Measurement>(this.url + '/GetCurrentMeasurement/' + user_id)
  }
}
