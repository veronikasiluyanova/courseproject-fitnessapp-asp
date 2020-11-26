import { Component, Input } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-components-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input() newuser = new User()
  
  signInBtnClick() {

  }
  
}
