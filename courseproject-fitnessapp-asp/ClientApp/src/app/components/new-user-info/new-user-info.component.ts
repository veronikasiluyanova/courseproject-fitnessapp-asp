import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-components-new-user-info',
  templateUrl: './new-user-info.component.html',
  styleUrls: ['./new-user-info.component.css']
})
export class NewUserInfoComponent implements OnInit {
  firstFormGroup: FormGroup
  secondFormGroup: FormGroup

  @Input() newuser = new User()
  username: string
  email: string
  account_id: string

  constructor(private route: ActivatedRoute,
    private _formBuilder: FormBuilder) {
    //this.username = this.route.snapshot.params["username"]
    //this.email = this.route.snapshot.params["email"]
    //this.account_id = this.route.snapshot.params["account_id"]
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      usernameCtrl: ['', Validators.required],
      emailCtrl: ['', Validators.required],
      genderCtrl: ['', Validators.required],
      bdayCtrl: ['', Validators.required]
    })
    this.username = this.route.snapshot.params["username"]
    this.email = this.route.snapshot.params["email"]
    this.account_id = this.route.snapshot.params["account_id"]
  }

  
}
