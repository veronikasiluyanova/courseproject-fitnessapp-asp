import { Component, Input } from '@angular/core';
import { Account } from '../../models/account';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-components-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input() currentaccount = new Account()
  error: string

  constructor(private authService: AuthService) { }

  public get isLoggedIn(): boolean {
    return this.authService.isAuthenticated()
  }

  login(username: string, password: string) {
    this.authService.login(username, password)
      .subscribe(res => {

      }, error => {
        console.log(error)
        this.error = 'Неправильный логин или пароль.'
      })
  }

  logout() {
    this.authService.logout()
  }
  
}
