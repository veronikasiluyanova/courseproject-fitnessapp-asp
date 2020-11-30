import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from '../models/activity';

@Injectable()
export class ActivityService {

  private url = "api/Activities";

  constructor(private http: HttpClient) { }

  getActivities() {
    return this.http.get<Activity[]>(this.url + '/');
  }

  getActivity(id: number) {
    return this.http.get<Activity>(this.url + '/' + id);
  }

}
