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

  getAllUsers() {
    return this.http.get<User[]>(this.url + '/');
  }

  getUser(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.url + '/' + id, user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
