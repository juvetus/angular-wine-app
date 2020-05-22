import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { RecipeModule } from "./recipe/recipe.module";

import { AppComponent } from './app.component';
import { AppRouteModule } from './app-router.module';

import { HeaderComponent } from './header/header.component';
import { ShoppingListModule } from "./shopping-list/shopping-list-module";

import { AuthComponent } from './recipe/auth/auth.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from "./core.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRouteModule,
    RecipeModule,
    ShoppingListModule,
    SharedModule,
    CoreModule
  ],
  providers: [],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
