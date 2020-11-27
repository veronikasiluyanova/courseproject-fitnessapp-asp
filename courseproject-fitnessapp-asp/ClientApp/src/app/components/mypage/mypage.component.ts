import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { WaterDialogComponent } from '../water-dialog/water-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-components-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})
export class MyPageComponent implements OnInit {
  water: string
  username: string

  constructor(public dialog: MatDialog,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.params['username']
  }

  openDialog() {
    const dialogRef = this.dialog.open(WaterDialogComponent, {
      width: '50%',
      data: { water: this.water }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.water = result;
      console.log(this.water);
    });
  }
}

