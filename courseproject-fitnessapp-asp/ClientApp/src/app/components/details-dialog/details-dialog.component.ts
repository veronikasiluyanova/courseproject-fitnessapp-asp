import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FoodDiaryRecord } from "../../models/fooddiaryrecord";
import { FoodDiaryService } from "../../services/fooddiary.service";

@Component({
  selector: 'details-dialog',
  templateUrl: './details-dialog.component.html',
  styles: []
})
export class DetailsDialogComponent implements OnInit {
  formData: string
  public allRecords: FoodDiaryRecord[]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<DetailsDialogComponent>,
    private foodDiaryService: FoodDiaryService) { }

  ngOnInit() {
    this.formData = ""

    this.foodDiaryService.getFoodDiaryRecords().subscribe(data => {
      this.allRecords = data
      //this.allRecords = data.fin
    })
  }
}
