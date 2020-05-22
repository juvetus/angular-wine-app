import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { RecipeModule } from "./recipe/recipe.module";

import { AppComponent } from './app.component';
import { AppRouteModule } from './app-router.module';

import { HeaderComponent } from './header/header.component';
import { ShoppingListModule } from "./shopping-list/shopping-list-module";

import { AuthModule } from './recipe/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from "./core.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouteModule,
    RecipeModule,
    ShoppingListModule,
    SharedModule,
    CoreModule,
    AuthModule
  ],
  providers: [],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
