import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodolistComponent } from './pages/todolist/todolist.component';
import { ShoppingService } from './services/shopping.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule 
  ],
  providers: [ShoppingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
