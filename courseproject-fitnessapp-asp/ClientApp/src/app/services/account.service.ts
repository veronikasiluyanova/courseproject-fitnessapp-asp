import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Account } from "../models/account";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private url = "api/Accounts";
  constructor(private http: HttpClient) { }

  getAllAccounts() {
    return this.http.get<Account[]>(this.url + '/');
  }

  getAccount(id: number) {
    return this.http.get(this.url + '/' + id);
  }
}
