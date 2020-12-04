import { Component, Inject, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { FoodService } from "../../services/food.service";
import { FoodItem } from "../../models/fooditem";
import { FoodType } from "../../models/foodtype";
import { FoodTypeService } from "../../services/foodtype.service";

@Component({
  selector: 'add-meal-dialog',
  templateUrl: './add-meal-dialog.component.html',
  styles: ['./add-meal-dialog.component.css']
})
export class AddMealDialogComponent {
  public meal_name: string
  food_id: number
  gramms: string

  public allFood: FoodItem[]
  public foodTypes: FoodType[]
  public dataSource: any

  displayedColumns: string[] = ['name', 'food_type_id', 'protein', 'fats', 'carbs', 'kcal']

  @ViewChild(MatSort, { static: false }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialog,
    private foodService: FoodService,
    private foodtypeService: FoodTypeService) {
    this.foodService.getFoodItems().subscribe(data => {
      this.allFood = data
      this.dataSource = new MatTableDataSource(this.allFood)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    })
    this.foodtypeService.getFoodTypes().subscribe(data => {
      this.foodTypes = data;
    })
  }

  search(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  selectRow(row) {
    this.data.food_id = row.id
    this.data.name = row.name
    this.dataSource.filter = row.name
  }

}

