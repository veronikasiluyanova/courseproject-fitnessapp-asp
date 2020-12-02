import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AddMealDialogComponent } from '../components/add-meal-dialog/add-meal-dialog.component';

@Injectable()
export class AddMealDialogService {
  food_id: number
  gramms: string

  constructor(public dialog: MatDialog) { }
  openDialog(): Observable<any> {
    const dialogRef = this.dialog.open(AddMealDialogComponent, {
      width: '50%',
      data: { food_id: this.food_id, gramms: this.gramms }
    });

    return dialogRef.afterClosed();
  }
}
