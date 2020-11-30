import { Component, Input } from '@angular/core';
import { Account, Role } from '../../models/account';
import { RegistrationService } from '../../services/registration.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-components-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  @Input() newaccount = new Account()
  @Input() email: string

  constructor(private regService: RegistrationService,
    private authService: AuthService,
    private router: Router) { }

  registrate() {
    this.newaccount.role = Role.User
    this.newaccount.id = Guid.create().toString()
    this.regService.registrateAccount(this.newaccount).subscribe()
    this.router.navigate(["/user-start-info", this.newaccount.username, this.email, this.newaccount.id])
  }
}
