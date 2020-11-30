import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "api/Users";
  constructor(private http: HttpClient) { }

  registrateUser(newuser: User) {
    return this.http.post(this.url, newuser);
  }
}
