import { Component, Input, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Goals } from '../../models/goals';
import { GoalsService } from '../../services/goals.service';
import { Activity } from '../../models/activity';
import { ActivityService } from '../../services/activity.service';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-components-new-user-info',
  templateUrl: './new-user-info.component.html',
  styleUrls: ['./new-user-info.component.css']
})
export class NewUserInfoComponent implements OnInit {
  firstFormGroup: FormGroup
  secondFormGroup: FormGroup
  thirdFormGroup: FormGroup
  finalFormGroup: FormGroup

  public goals: Goals[]
  public activities: Activity[]

  @Input() newuser = new User()
  username: string
  email: string
  account_id: string
  show = false
  date: any
  age: number
  coeff: number
  activity: Activity

  bmr: number
  protein: number
  fats: number
  carbs: number

  @ViewChild('firstDialog', { static: true })
  firstDialog: TemplateRef<any>;

  constructor(private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private goalsService: GoalsService,
    private activityService: ActivityService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog) {
    this.username = this.route.snapshot.params["username"]
    this.email = this.route.snapshot.params["email"]
    this.account_id = this.route.snapshot.params["account_id"]
  }

  ngOnInit(): void {
    this.goalsService.getGoals().subscribe(data => {
      this.goals = data
    })
    this.activityService.getActivities().subscribe(data => {
      this.activities = data
    })

    this.username = this.route.snapshot.params["username"]
    this.email = this.route.snapshot.params["email"]
    this.account_id = this.route.snapshot.params["account_id"]

    this.firstFormGroup = this._formBuilder.group({
      usernameCtrl: [this.username],
      emailCtrl: [this.email],
      genderCtrl: ['', Validators.required],
      bdayCtrl: ['', Validators.required]
    })
    this.secondFormGroup = this._formBuilder.group({
      goalsCtrl: ['', Validators.required],
      heightCtrl: ['', Validators.required],
      weightCtrl: ['', Validators.required],
      goalweightCtrl: ['']
    })
    this.thirdFormGroup = this._formBuilder.group({
      activityCtrl: ['']
    })
    this.finalFormGroup = this._formBuilder.group({
      kcalCtrl: [''],
      protCtrl: [''],
      fatsCtrl: [''],
      carbsCtrl: ['']
    })
  }

  click() {
    this.newuser.account_id = this.account_id
    this.newuser.username = this.username
    this.newuser.email = this.email
    this.newuser.gender = this.firstFormGroup.get("genderCtrl").value
    this.newuser.birthday = this.firstFormGroup.get("bdayCtrl").value
    this.newuser.goal_id = this.secondFormGroup.get("goalsCtrl").value
    this.newuser.goal_weight = +this.secondFormGroup.get("goalweightCtrl").value
    this.newuser.start_weight = +this.secondFormGroup.get("weightCtrl").value
    this.newuser.height = +this.secondFormGroup.get("heightCtrl").value
    this.newuser.activity = this.thirdFormGroup.get("activityCtrl").value

    this.date = new Date(this.newuser.birthday).getTime()
    this.age = Math.floor(((Date.now() - this.date) / 86400000) / 365.25)

    this.activityService.getActivity(this.newuser.activity.valueOf()).subscribe(
      data => this.coeff = data.coefficient.valueOf())

    this.count(this.newuser.gender, this.newuser.height, this.newuser.start_weight, this.age, this.coeff, this.newuser.goal_id)

    this.finalFormGroup.get("kcalCtrl").setValue(Math.ceil(this.bmr))
    this.finalFormGroup.get("protCtrl").setValue(Math.ceil(this.protein))
    this.finalFormGroup.get("fatsCtrl").setValue(Math.ceil(this.fats))
    this.finalFormGroup.get("carbsCtrl").setValue(Math.ceil(this.carbs))

    this.newuser.kcal_norm = this.finalFormGroup.get("kcalCtrl").value
    this.newuser.protein_norm = this.finalFormGroup.get("protCtrl").value
    this.newuser.fats_norm = this.finalFormGroup.get("fatsCtrl").value
    this.newuser.carbs_norm = this.finalFormGroup.get("carbsCtrl").value
  }

  submit() {
    console.log(this.newuser)
    this.userService.registrateUser(this.newuser)
      .subscribe(data => {
          this.router.navigate(["/"])
    })
    this.dialog.open(this.firstDialog);
  }

  count(g: string, h: number, w: number, a: number, c_act: number, goal: number) {
    if (g == 'F') {
      this.bmr = (447.6 + 9.2 * w + 3.1 * h - 4.3 * a) * c_act
    }
    else {
      this.bmr = (88.36 + 13.4 * w + 4.8 * h - 5.7 * a) * c_act
    }
    switch (goal) {
      case 1:
        this.bmr = this.bmr - this.bmr * 0.15
        break
      case 3:
        this.bmr = this.bmr * 1.15
        break
    }

    switch (goal) {
      case 1:
        this.protein = 2.5 * w
        this.fats = 1 * w
        this.carbs = 1.5 * w
        break
      case 2:
        this.protein = 2 * w
        this.fats = 1 * w
        this.carbs = 2.5 * w
        break
      case 3:
        this.protein = 1.5 * w
        this.fats = 0.8 * w
        this.carbs = 4 * w
        break
    }
    this.show = true;
  }
}
