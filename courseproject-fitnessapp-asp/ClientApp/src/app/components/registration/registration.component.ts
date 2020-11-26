import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { error } from 'protractor';

@Component({
  selector: 'app-components-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input() newuser = new User()
  error: string

  constructor(private authService: AuthService) { }

  login(username: string, password: string) {
    this.authService.login(username, password)
      .subscribe(res => {

      }, error => {
        this.error = 'Неправильный логин или пароль.'
      })
  }

  logout() {
    this.authService.logout()
  }
  
}
