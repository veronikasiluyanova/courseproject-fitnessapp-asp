import { Component, OnInit } from '@angular/core';
import { ID } from '../../services/auth.service';
import { Measurement } from '../../models/measurement';
import { MeasurementService } from '../../services/measurement.service';
import { Chart } from 'chart.js';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  providers: [DatePipe]
})
export class LineChartComponent implements OnInit {
  user_id: number;

  userMeasurements: Measurement[];
  dates: string[] = [];
  weight: number[] = [];
  chest: number[] = [];
  waist: number[] = [];
  hip: number[] = [];
  Linechart = [];

  constructor(private measurementService: MeasurementService,
    private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.user_id = +localStorage.getItem(ID);
    this.measurementService.getMeasurements().subscribe(data => {
      this.userMeasurements = data.filter(m => m.user_id === this.user_id);
      this.userMeasurements.forEach(i => {
        this.dates.push(this.datepipe.transform(i.date_measurement, 'yyyy-MM-dd'));
        this.weight.push(i.weight);
        this.chest.push(i.chest);
        this.waist.push(i.waist);
        this.hip.push(i.hip);
      });
    });
  }

  change(param: number) {
    this.Linechart = this.creatChart(param);
  }

  creatChart(param: number): Chart {
    let _data;
    switch (param) {
      case 1:
        _data = this.weight;
        break;
      case 2:
        _data = this.chest;
        break;
      case 3:
        _data = this.waist;
        break;
      case 4:
        _data = this.hip;
        break;
    }
    let linechart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.dates,
        datasets: [
          {
            data: _data,
            borderColor: '#6d02ba',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
    return linechart;
  }
}



