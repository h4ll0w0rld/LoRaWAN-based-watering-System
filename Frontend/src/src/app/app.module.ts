import { CUSTOM_ELEMENTS_SCHEMA, NgModule, ViewChild } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HumidityComponent } from './humidity/humidity.component';
import { HttpClientModule } from '@angular/common/http';
import { PotCarousselComponent } from './pot-caroussel/pot-caroussel.component';
import { register } from 'swiper/element/bundle';
import { CardComponent } from './card/card.component';
import { TodoComponent } from './todo/todo.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';










//Register swiperJs
register();
@NgModule({
  declarations: [
    AppComponent,
    HumidityComponent,
    PotCarousselComponent,
    CardComponent,
    TodoComponent,
    AuthComponent,
    DialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {


  }

  addEvent() {
    console.log("click")
  }



}
