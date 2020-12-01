import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { Observable } from "rxjs";

@Component({
  selector: 'measurement-dialog',
  templateUrl: './measurement-dialog.component.html',
  styles: []
})
export class MeasurementDialogComponent {
  weight: string
  height: string
  chest: string
  waist: string
  hip: string
  date_measurement: Date

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialog) { }

}

