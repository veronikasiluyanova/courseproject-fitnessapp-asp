//import { Injectable, Inject } from '@angular/core'
//import { Observable } from 'rxjs';
//import { Token } from '../models/token';
//import { HttpClient } from '@angular/common/http';
//import { JwtHelperService } from 'angular-jwt';
//import { Router } from '@angular/router';
//import { tap } from 'rxjs/operators';
//export const ACCESS_TOKEN_KEY = ''
//@Injectable({
//  providedIn: 'root'
//})
//export class AuthService {
//  constructor(
//    private http: HttpClient,
//   // @Inject(BASE_URL) private apiUrl: string,
//    private jwtHelper: JwtHelperService,
//    private router: Router) { }
//  login(username: string, password: string): Observable<Token> {
//    return this.http.post<Token>('https://localhost:44360/api/auth/Login', {
//      username, password
//    }).pipe(
//      tap(token => {
//        localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token)
//      })
//    )
//  }
//  isAuthenticated(): boolean {
//    let token = localStorage.getItem(ACCESS_TOKEN_KEY)
//    return token && !this.jwtHelper.isTokenExpired(token)
//  }
//  logout(): void {
//    localStorage.removeItem(ACCESS_TOKEN_KEY);
//    this.router.navigate([''])
//  }
//}
//# sourceMappingURL=auth.service.js.map