import { Injectable } from "@angular/core";
import { Account } from "../models/account";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private url = "api/Accounts";
constructor(private http: HttpClient) { }

  registrateAccount(newaccount: Account) {
    return this.http.post(this.url, newaccount)
  }

  getAllAccounts() {
    return this.http.get<Account[]>(this.url + '/');
  }
}
