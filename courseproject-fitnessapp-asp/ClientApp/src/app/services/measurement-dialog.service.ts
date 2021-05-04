import { Injectable, Inject, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { MeasurementDialogComponent } from '../components/measurement-dialog/measurement-dialog.component';
import { Measurement } from '../models/measurement';
import {MAT_DIALOG_DATA} from '@angular/material';

@Injectable()
export class MeasurementDialogService {
  weight: string
  height: string
  chest: string
  waist: string
  hip: string
  date_measurement: Date

  constructor(public dialog: MatDialog) { }
  openDialog(m: Measurement): Observable<any> {
    const dialogRef = this.dialog.open(MeasurementDialogComponent, {
      width: '50%',
      data: { weight: this.weight, height: this.height, chest: this.chest, waist: this.waist, hip: this.hip, date_measurement: this.date_measurement }
    });

    return dialogRef.afterClosed();
  }
}

