import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { FoodComponent } from './components/food/food.component';
import { AddFoodItemComponent } from './components/add-food-item/add-food-item.component';
import { MyPageComponent } from './components/mypage/mypage.component';

import { FoodService } from './services/food.service';
import { FoodTypeService } from './services/foodtype.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { CdkColumnDef } from '@angular/cdk/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { WaterDialogComponent } from './components/water-dialog/water-dialog.component';
import { LoginComponent } from './components/login/login.component';

import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { ACCESS_TOKEN_KEY } from './services/auth.service';
import { AUTH_API_URL, STORE_API_URL } from './app-injection-tokens';
import { AuthGuard } from './guards/auth.guard';

export function tokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FoodComponent,
    AddFoodItemComponent,
    MyPageComponent,
    WaterDialogComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }), BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'home', component: HomeComponent },
      { path: 'food-info', component: FoodComponent },
      { path: 'add-food-item', component: AddFoodItemComponent },
      { path: 'mypage', component: MyPageComponent, canActivate: [AuthGuard] }
    ]),
    MatTableModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,
    MatIconModule, MatDialogModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.tokenWhiteListedDomains
      }
    })
  ],
  providers: [
    FoodService,
    FoodTypeService,
    CdkColumnDef,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },

    { provide: AUTH_API_URL, useValue: environment.authApi },

    { provide: STORE_API_URL, useValue: environment.storeApi }
  ],
  bootstrap: [AppComponent],
  entryComponents: [WaterDialogComponent]
})
export class AppModule { }
