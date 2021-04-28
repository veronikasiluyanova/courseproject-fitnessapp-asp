import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AuthService, ID } from 'src/app/services/auth.service';
import { FoodDiaryService } from 'src/app/services/fooddiary.service';
import { MeasurementService } from 'src/app/services/measurement.service';
import { UserService } from 'src/app/services/user.service';
import { WaterDiaryService } from 'src/app/services/waterdiary.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  acc_id: any;
  close: boolean = false;
  
  constructor(private accService: AccountService,
    private userService: UserService,
    private waterService: WaterDiaryService,
    private dairyService: FoodDiaryService,
    private measurementService: MeasurementService,
    private authService: AuthService) {      
    this.userService.getUser(+localStorage.getItem(ID)).subscribe(r => {
      this.acc_id = r.account_id;
    }); 
  }

  ngOnInit() { 
    
  }

  deleteAccount() { 
    console.log("accId "+this.acc_id)
    console.log("userId "+localStorage.getItem(ID))
    this.measurementService.deleteMeasurementByUser(+localStorage.getItem(ID)).subscribe(r => {
      this.dairyService.deleteDiaryByUser(+localStorage.getItem(ID)).subscribe(r => {
        this.waterService.deleteWaterDiaryByUser(+localStorage.getItem(ID)).subscribe(r=> {
          this.userService.deleteUser(+localStorage.getItem(ID)).subscribe(r => {
            this.accService.deleteAccount(this.acc_id).subscribe(r => {
              this.close = true;
              this.authService.logout();
            });
          });
        });           
      });         
    });    
  }
}
