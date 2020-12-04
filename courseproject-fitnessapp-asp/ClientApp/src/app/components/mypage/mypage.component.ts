import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { WaterDialogComponent } from '../water-dialog/water-dialog.component';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ID } from '../../services/auth.service';
import { Measurement } from '../../models/measurement';
import { MeasurementService } from '../../services/measurement.service';
import { MeasurementDialogService } from '../../services/measurement-dialog.service';
import { DatePipe } from '@angular/common';
import { AddMealDialogService } from '../../services/add-meal-dialog.service';
import { FoodService } from '../../services/food.service';
import { FoodDiaryRecord } from '../../models/fooddiaryrecord';
import { FoodDiaryService } from '../../services/fooddiary.service';
import { Router } from '@angular/router';
import { WaterDiaryService } from '../../services/waterdiary.service';
import { WaterDiaryRecord } from '../../models/waterdiaryrecord';

@Component({
  selector: 'app-components-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css'],
  providers: [DatePipe]
})
export class MyPageComponent implements OnInit {
  username: string;
  start_weight: number; current_weight: number; goal_weight: number;

  weight: string; height: string; chest: string; waist: string; hip: string;
  date_measurement: Date;

  public allUsers: User[];
  public currentuser: User;
  public newmeasurement: Measurement;
  public diaryrecord = new FoodDiaryRecord();
  public path: string;

  public breakfastFood = "";
  public lunchFood = "";
  public dinnerFood = "";
  public snackFood = "";

  public totalString = "ИТОГО: ";
  allRecords: FoodDiaryRecord[]
  totalBreakfast: FoodDiaryRecord[];

  waterNorm: number; waterTotal: number;
  waterId: number;
  waterDiaryRecord: WaterDiaryRecord;

  @ViewChild('callAPIDialog', { static: true }) callAPIDialog: TemplateRef<any>

  constructor(public dialog: MatDialog,
    private userService: UserService,
    private measurementService: MeasurementService,
    public dialogService: MeasurementDialogService,
    public addMealDialogService: AddMealDialogService,
    private foodDiaryService: FoodDiaryService,
    private foodService: FoodService,
    private waterDiaryService: WaterDiaryService,
    private router: Router) {  }

  ngOnInit(): void {
    this.userService.getUser(+localStorage.getItem(ID)).subscribe(data => {
      this.currentuser = data;

      this.username = this.currentuser.username;
      this.start_weight = this.currentuser.start_weight;
      this.goal_weight = this.currentuser.goal_weight;
      this.path = (this.currentuser.gender === "F") ? "../../../assets/images/female.jpg" : "../../../assets/images/male.jpg";

      this.measurementService.getCurrent(this.currentuser.id).subscribe(data => {
        this.current_weight = data.weight;

        this.foodDiaryService.getFoodDiaryRecords().subscribe(data => {
          this.allRecords = data.filter(r => r.user_id === this.currentuser.id).filter(rr => rr.date_diary === new Date(Date.now()));

          this.totalBreakfast = this.allRecords.filter(r => r.meal_id === 1);
          this.totalBreakfast.forEach((i: FoodDiaryRecord) => {
            this.foodService.getFoodItem(i.food_id).subscribe(data => {
              this.breakfastFood = this.breakfastFood + data.name + '(' + this.totalBreakfast.find(r => r.food_id === data.id).gramms + ') ';
            });
          });
        });
      });

      this.waterNorm = this.currentuser.water_norm;
      this.waterDiaryService.getTodayWater(+localStorage.getItem(ID)).subscribe(data => {
        this.waterId = data ? data.id : -1;
        this.waterTotal = data ? data.ml : 0;
        this.waterDiaryRecord = data ? data : new WaterDiaryRecord();
      });
    });    
  }

  openDialog() {
    const dialogRef = this.dialog.open(WaterDialogComponent, {
      width: '50%',
      data: { water: this.waterNorm }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.waterNorm = result;

      this.currentuser.water_norm = this.waterNorm;
      this.userService.updateUser(+localStorage.getItem(ID), this.currentuser).subscribe()
    });
    
  }

  updateMeasurement() {
    this.dialogService.openDialog().subscribe(data => {
      this.newmeasurement = data;
      this.newmeasurement.height = parseFloat(this.newmeasurement.height.toString());
      this.newmeasurement.weight = parseFloat(this.newmeasurement.weight.toString());
      this.newmeasurement.chest = parseFloat(this.newmeasurement.chest.toString());
      this.newmeasurement.waist = parseFloat(this.newmeasurement.waist.toString());
      this.newmeasurement.hip = parseFloat(this.newmeasurement.hip.toString());
      this.newmeasurement.date_measurement = new Date(this.newmeasurement.date_measurement);
      this.newmeasurement.user_id = this.currentuser.id;
      this.measurementService.addMeasurement(this.newmeasurement).subscribe();
    });    
  } 

  showProgress() {
    this.router.navigate(['line-chart']);
  }

  increaseValue() {
    this.waterTotal = this.waterTotal + 250;
    if (this.waterId !== -1) {
      this.waterDiaryRecord.ml = this.waterTotal;
      this.waterDiaryService.updateWaterDiaryRecord(this.waterDiaryRecord.id, this.waterDiaryRecord).subscribe();
    }
    else {
      this.waterDiaryRecord.date_water = new Date(Date.now());
      this.waterDiaryRecord.user_id = +localStorage.getItem(ID);
      this.waterDiaryRecord.ml = this.waterTotal;
      this.waterDiaryService.createWaterDiaryRecord(this.waterDiaryRecord).subscribe();
      this.waterId = 0;
    }
  }

  decreaseValue() {
    if (this.waterTotal !== 0) {
      this.waterTotal = this.waterTotal - 250;
        this.waterDiaryRecord.ml = this.waterTotal;
        this.waterDiaryService.updateWaterDiaryRecord(this.waterDiaryRecord.id, this.waterDiaryRecord).subscribe();
    }
  }

  addMealGeneral(meal_id: number) {
    this.addMealDialogService.openDialog().subscribe(data => {
      this.diaryrecord.food_id = data.food_id;
      this.diaryrecord.gramms = +data.gramms;
      this.diaryrecord.date_diary = new Date(Date.now());
      this.diaryrecord.meal_id = meal_id;
      this.diaryrecord.user_id = this.currentuser.id;
      this.foodDiaryService.createFoodDiaryRecord(this.diaryrecord).subscribe();
      switch (meal_id) {
        case 1:
          this.breakfastFood = this.breakfastFood + data.name + ' (' + data.gramms + 'г) ';
          break;
        case 2:
          this.lunchFood = this.lunchFood + data.name + ' (' + data.gramms + 'г) ';
          break;
        case 3:
          this.dinnerFood = this.dinnerFood + data.name + ' (' + data.gramms + 'г) ';
          break;
        case 4:
          this.snackFood = this.snackFood + data.name + ' (' + data.gramms + 'г) ';
          break;
      }
    });
  }

  addBreakfast() {
    this.addMealGeneral(1);
 }

  addLunch() {
    this.addMealGeneral(2);
  }

  addDinner() {
    this.addMealGeneral(3);
  }

  addSnack() {
    this.addMealGeneral(4);
  }

  openMore() {

  }
}
