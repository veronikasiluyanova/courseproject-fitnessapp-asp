import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { Account, Role } from '../../models/account';
import { RegistrationService } from '../../services/registration.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-components-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  @Input() newaccount = new Account()
  @Input() newuser = new User()

  constructor(private regService: RegistrationService,
    private authService: AuthService,
    private router: Router) { }

  registrate() {
    this.newaccount.role = Role.User;
    this.regService.registrateAccount(this.newaccount)
      .subscribe(data => {
        this.authService.login(this.newaccount.username, this.newaccount.password);
        this.router.navigate(["/mypage"])
      })
  }
}
