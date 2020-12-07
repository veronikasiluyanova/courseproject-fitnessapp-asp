import { Component, OnInit, ViewChild } from '@angular/core'
import { FoodService } from '../../services/food.service'
import { FoodItem } from '../../models/fooditem'
import { FoodType } from '../../models/foodtype'
import { FoodTypeService } from '../../services/foodtype.service'
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material'

@Component({
    selector: 'app-components-food',
    templateUrl: './food.component.html',
    styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  public foodTypes: FoodType[];
  public dataSource;

  displayedColumns: string[] = ['name', 'food_type_id', 'protein', 'fats', 'carbs', 'kcal'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private foodService: FoodService,
    private foodtypeService: FoodTypeService) {
  }

  ngOnInit() {
    this.foodtypeService.getFoodTypes().subscribe(data => {
      this.foodTypes = data;
    });
    this.foodService.getFoodItems().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
}
