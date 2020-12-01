import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { WaterDialogComponent } from '../water-dialog/water-dialog.component';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { CURRENT_USERNAME } from '../../services/auth.service';
import { Measurement } from '../../models/measurement';
import { MeasurementService } from '../../services/measurement.service';
import { DialogService } from '../../services/dialog.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-components-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css'],
  providers: [DatePipe]
})
export class MyPageComponent implements OnInit {
  water: string
  username: string
  start_weight: number
  current_weight: number
  goal_weight: number

  weight: string
  height: string
  chest: string
  waist: string
  hip: string
  date_measurement: Date

  public allUsers: User[]
  public currentuser: User

  public newmeasurement: Measurement

  @ViewChild('callAPIDialog', { static: true }) callAPIDialog: TemplateRef<any>

  constructor(public dialog: MatDialog,
    private userService: UserService,
    private measurementService: MeasurementService,
    public dialogService: DialogService) {
    this.username = localStorage.getItem(CURRENT_USERNAME)
    this.userService.getAllUsers().subscribe(data => {
      this.currentuser = data.find(user => user.username === this.username)
      this.start_weight = this.currentuser.start_weight
      this.goal_weight = this.currentuser.goal_weight
    })
  }

  ngOnInit(): void {
    
  }

  openDialog() {
    const dialogRef = this.dialog.open(WaterDialogComponent, {
      width: '50%',
      data: { water: this.water }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.water = result
    });
    
  }

  updateMeasurement() {
    this.dialogService.openDialog().subscribe(data => {
      this.newmeasurement = data
      this.newmeasurement.height = parseFloat(this.newmeasurement.height.toString())
      this.newmeasurement.weight = parseFloat(this.newmeasurement.weight.toString())
      this.newmeasurement.chest = parseFloat(this.newmeasurement.chest.toString())
      this.newmeasurement.waist = parseFloat(this.newmeasurement.waist.toString())
      this.newmeasurement.hip = parseFloat(this.newmeasurement.hip.toString())
      this.newmeasurement.date_measurement = new Date(this.newmeasurement.date_measurement)
      console.log(this.newmeasurement.date_measurement)
      this.newmeasurement.user_id = this.currentuser.id
      this.measurementService.addMeasurement(this.newmeasurement).subscribe()
    });
    
  } 

  showProgress() {

  }
}
