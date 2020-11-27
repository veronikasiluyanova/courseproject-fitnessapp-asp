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
import { WaterDialogComponent } from './components/water-dialog/water-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { NewUserInfoComponent } from './components/new-user-info/new-user-info.component';

import { FoodService } from './services/food.service';
import { FoodTypeService } from './services/foodtype.service';

import { AuthGuard } from './guards/auth.guard';

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
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatStepperModule } from '@angular/material/stepper';

import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { ACCESS_TOKEN_KEY } from './services/auth.service';

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
    LoginComponent,
    RegistrationComponent,
    NewUserInfoComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }), BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      //{ path: 'home', component: HomeComponent },
      { path: 'food-info', component: FoodComponent, canActivate: [AuthGuard] },
      { path: 'add-food-item', component: AddFoodItemComponent, canActivate: [AuthGuard] },
      { path: 'mypage/:username', component: MyPageComponent, canActivate: [AuthGuard] },
      { path: 'registration', component: RegistrationComponent },
      { path: 'user-start-info/:username/:email/:account_id', component: NewUserInfoComponent }
    ]),
    MatTableModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,
    MatIconModule, MatDialogModule, MatRadioModule, MatAutocompleteModule, MatStepperModule,

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

  ],
  bootstrap: [AppComponent],
  entryComponents: [WaterDialogComponent]
})
export class AppModule { }
