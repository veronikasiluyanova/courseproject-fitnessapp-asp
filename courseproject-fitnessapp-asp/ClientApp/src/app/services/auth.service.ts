import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
//import { AUTH_API_URL } from '../app-injection-tokens';
import { tap } from 'rxjs/operators';
import { Token } from '../models/token';
import { Account } from '../models/account';

export const ACCESS_TOKEN_KEY = 'fitnessapp_access_token'
export const CURRENT_USERNAME = ''


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router) {  }

  login(username: string, password: string): Observable<Token> {
    return this.http.post<Token>('api/auth/Login', {
      username, password
    }).pipe(
      tap(token => {
        localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token)
        localStorage.setItem(CURRENT_USERNAME, username)
        console.log(CURRENT_USERNAME)
      })
    )
  }

  isAuthenticated(): boolean {
    let token = localStorage.getItem(ACCESS_TOKEN_KEY)
    return token && !this.jwtHelper.isTokenExpired(token)
  }

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.router.navigate([''])
  }
}
