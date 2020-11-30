import { HttpClient } from '@angular/common/http';
import { Goals } from '../models/goals';
import { Injectable } from '@angular/core';

@Injectable()
export class GoalsService {

  private url = "api/Goals";

  constructor(private http: HttpClient) { }

  getGoals() {
    return this.http.get<Goals[]>(this.url + '/');
  }

  getGoal(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  createGoal(newgoal: Goals) {
    return this.http.post(this.url, newgoal);
  }

  deleteGoal(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
