import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { RecipeModule } from "./recipe/recipe.module";


import { AppComponent } from './app.component';
import { AppRouteModule } from './app-router.module';
import { HeaderComponent } from './header/header.component';
import { AuthIntercepterService} from './recipe/auth/auth-interceptor.service'
import { ShoppingListModule } from "./shopping-list/shopping-list-module";

import { RecipeService } from './recipe/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AuthComponent } from './recipe/auth/auth.component';
import { AlertComponent } from './shared/alert/alert.component';
import { SharedModule } from './shared/shared.module';

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
    SharedModule
  ],
  providers: [ShoppingListService, RecipeService,{ 
    provide:HTTP_INTERCEPTORS,
    useClass:AuthIntercepterService,
    multi:true}],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
