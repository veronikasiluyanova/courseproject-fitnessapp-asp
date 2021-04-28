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
import { FoodItem } from '../../models/fooditem';

interface Meal {
  kcal: number;
  protein: number;
  fats: number;
  carbs: number;
}

@Component({
  selector: 'app-components-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css'],
  providers: [DatePipe]
})
export class MyPageComponent implements OnInit {
  username: string;
  start_weight: number; current_weight: number; goal_weight: number;

  current_chest: number; current_waist: number; current_hip: number;

  kcal_norm: number; protein_norm: number; fats_norm: number; carbs_norm: number;

  weight: string; height: string; chest: string; waist: string; hip: string;
  date_measurement: Date;

  public allUsers: User[];
  public currentuser: User;
  public newmeasurement: Measurement;
  public diaryrecord = new FoodDiaryRecord();
  public path: string;

  allFood: FoodItem[];

  public breakfastFood = ""; public lunchFood = "";  public dinnerFood = ""; public snackFood = "";

  public breakfast: Meal; public lunch: Meal; public dinner: Meal; public snack: Meal;

  public totalFood = 0;
  allRecords: FoodDiaryRecord[]
  totalBreakfast: any; //FoodDiaryRecord[];
  totalLunch: any;
  totalDinner: any;
  totalSnack: any;

  waterNorm: number; waterTotal: number;
  waterId: number;
  waterDiaryRecord: WaterDiaryRecord;

  @ViewChild('callAPIDialog', { static: true }) callAPIDialog: TemplateRef<any>

  tmp: number;

  constructor(public dialog: MatDialog,
    private userService: UserService,
    private measurementService: MeasurementService,
    public dialogService: MeasurementDialogService,
    public addMealDialogService: AddMealDialogService,
    private foodDiaryService: FoodDiaryService,
    private foodService: FoodService,
    private waterDiaryService: WaterDiaryService,
    private router: Router,
    private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.userService.getUser(+localStorage.getItem(ID)).subscribe(data => {
      this.currentuser = data;

      this.username = this.currentuser.username;
      this.start_weight = this.currentuser.start_weight;
      this.goal_weight = this.currentuser.goal_weight;

      this.kcal_norm = this.currentuser.kcal_norm;
      this.protein_norm = this.currentuser.protein_norm;
      this.fats_norm = this.currentuser.fats_norm;
      this.carbs_norm = this.currentuser.carbs_norm;

      this.path = (this.currentuser.gender === "F") ? "../../../assets/images/female.jpg" : "../../../assets/images/male.jpg";

      this.measurementService.getCurrent(this.currentuser.id).subscribe(m => {
        this.current_weight = m.weight;
        this.current_chest = m.chest;
        this.current_waist = m.waist;
        this.current_hip = m.hip;

        this.foodDiaryService.getFoodDiaryRecords().subscribe(f => {
          this.allRecords = f.filter(r => r.user_id === this.currentuser.id)
            .filter(rr => this.datepipe.transform(rr.date_diary, 'yyyy-MM-dd') === this.datepipe.transform(Date.now(), 'yyyy-MM-dd'));

          this.totalBreakfast = this.allRecords.filter(r => r.meal_id === 1);
          this.totalLunch = this.allRecords.filter(r => r.meal_id === 2);
          this.totalDinner = this.allRecords.filter(r => r.meal_id === 3);
          this.totalSnack = this.allRecords.filter(r => r.meal_id === 4);

          this.totalBreakfast.forEach(i => {
            this.foodService.getFoodItem(i.food_id).subscribe(fi => {
              this.breakfastFood = this.breakfastFood + fi.name + '(' + this.totalBreakfast.find(r => r.food_id === fi.id).gramms.toString() + 'г) ';
            });
            this.totalFood = this.totalFood + i.kcal;
          });

          this.totalLunch.forEach(i => {
            this.foodService.getFoodItem(i.food_id).subscribe(fi => {
              this.lunchFood = this.lunchFood + fi.name + '(' + this.totalLunch.find(r => r.food_id === fi.id).gramms.toString() + 'г) ';
            });
            this.totalFood = this.totalFood + i.kcal;
         });

          this.totalDinner.forEach(i => {
            this.foodService.getFoodItem(i.food_id).subscribe(fi => {
              this.dinnerFood = this.dinnerFood + fi.name + '(' + this.totalDinner.find(r => r.food_id === fi.id).gramms.toString() + 'г) ';
            });
            this.totalFood = this.totalFood + i.kcal;
          });

          this.totalSnack.forEach(i => {
            this.foodService.getFoodItem(i.food_id).subscribe(fi => {
              this.snackFood = this.snackFood + fi.name + '(' + this.totalSnack.find(r => r.food_id === fi.id).gramms.toString() + 'г) ';
            });
            this.totalFood = this.totalFood + i.kcal;
          });
       });
      });

      this.waterNorm = this.currentuser.water_norm;
      this.waterDiaryService.getTodayWater(+localStorage.getItem(ID)).subscribe(w => {
        this.waterId = w ? w.id : -1;
        this.waterTotal = w ? w.ml : 0;
        this.waterDiaryRecord = w ? w : new WaterDiaryRecord();
      });
    });    
  }

  updateMeasurement() {
    this.dialogService.openDialog().subscribe(data => {
      if (data) {
        this.newmeasurement = data;
        this.newmeasurement.height = parseFloat(this.newmeasurement.height.toString());
        this.newmeasurement.weight = parseFloat(this.newmeasurement.weight.toString());
        this.newmeasurement.chest = parseFloat(this.newmeasurement.chest.toString());
        this.newmeasurement.waist = parseFloat(this.newmeasurement.waist.toString());
        this.newmeasurement.hip = parseFloat(this.newmeasurement.hip.toString());
       // this.newmeasurement.date_measurement = this.newmeasurement.date_measurement;
        this.newmeasurement.user_id = this.currentuser.id;
        this.measurementService.addMeasurement(this.newmeasurement).subscribe();
        this.current_chest = parseFloat(this.newmeasurement.chest.toString());
        this.current_hip = parseFloat(this.newmeasurement.hip.toString());
        this.current_waist = parseFloat(this.newmeasurement.waist.toString());
      }
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

  addMeal(meal_id: number) {
    this.addMealDialogService.openDialog().subscribe(data => {
      if (data) {
        this.tmp = +data.gramms;
        this.diaryrecord.food_id = data.food_id;
        this.diaryrecord.gramms = +data.gramms;
        this.diaryrecord.date_diary = new Date(Date.now());
        this.diaryrecord.meal_id = meal_id;
        this.diaryrecord.user_id = this.currentuser.id;

        this.foodService.getFoodItem(data.food_id).subscribe(d => {
          this.diaryrecord.kcal = d.kcal / 100 * this.tmp;
          this.diaryrecord.protein = d.protein / 100 * this.tmp;
          this.diaryrecord.fats = d.fats / 100 * this.tmp;
          this.diaryrecord.carbs = d.carbs / 100 * this.tmp;
          this.totalFood = this.totalFood + d.kcal / 100 * this.tmp;
          this.foodDiaryService.createFoodDiaryRecord(this.diaryrecord).subscribe();
        });

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
      }
    });
  }

  openMore() {
    this.router.navigate(['details']);
  }

  openWaterDialog() {
    const dialogRef = this.dialog.open(WaterDialogComponent, {
      width: '50%',
      data: { water: this.waterNorm }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.waterNorm = result;
        this.currentuser.water_norm = this.waterNorm;
        this.userService.updateUser(+localStorage.getItem(ID), this.currentuser).subscribe()
      }
    });
  }

  onFileSelected(event) {
    
  }
}
