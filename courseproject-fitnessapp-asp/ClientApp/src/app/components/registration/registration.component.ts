import { Component, Input, OnInit } from '@angular/core';
import { Account, Role } from '../../models/account';
import { RegistrationService } from '../../services/registration.service';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-components-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @Input() newaccount = new Account()
  @Input() email: string

  public errorUsername = false
  public allAccounts: Account[]

  constructor(private regService: RegistrationService,
    private router: Router) { }

  ngOnInit(): void {
    this.regService.getAllAccounts().subscribe(data => {
      this.allAccounts = data
    })
  }

  registrate() {
    if (this.allAccounts.some(acc => acc.username === this.newaccount.username)) {
      this.errorUsername = true
    }
    else {
      this.errorUsername = false
      this.newaccount.role = Role.User
      this.newaccount.id = Guid.create().toString()
      this.regService.registrateAccount(this.newaccount).subscribe()
      this.router.navigate(["/user-start-info", this.newaccount.username, this.email, this.newaccount.id])
    }
  }
}
