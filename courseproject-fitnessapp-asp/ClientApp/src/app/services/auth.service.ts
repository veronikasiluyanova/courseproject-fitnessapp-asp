import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
//import { AUTH_API_URL } from '../app-injection-tokens';
import { tap } from 'rxjs/operators';
import { Token } from '../models/token';
import { UserService } from './user.service';
export const ACCESS_TOKEN_KEY = 'fitnessapp_access_token'
export const ID = ''

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private userService: UserService) { }

  login(username: string, password: string): Observable<Token> {
    return this.http.post<Token>('api/auth/Login', {
      username, password
    }).pipe(
      tap(token => {
        localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
        this.userService.getAllUsers().subscribe(date => {
          localStorage.setItem(ID, date.find(u => u.username === username).id.toString());
          console.log(localStorage.getItem(ID));
          this.router.navigate(["/mypage"]);
        });
      })
    )
  }

  isAuthenticated(): boolean {
    let token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(ID);
    this.router.navigate([''])
  }
}
