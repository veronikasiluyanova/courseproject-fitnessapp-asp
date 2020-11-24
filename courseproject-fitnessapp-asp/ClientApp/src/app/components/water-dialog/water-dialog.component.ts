import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'water-dialog',
  templateUrl: './water-dialog.component.html',
  styles: []
})
export class WaterDialogComponent implements OnInit {
  formData: string

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<WaterDialogComponent>) { }

  ngOnInit() {
    this.formData = ""
  }
}
