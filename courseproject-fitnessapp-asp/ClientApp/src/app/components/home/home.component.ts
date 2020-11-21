import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-components-home-component',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    console.log("OK");
    }
}
