import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { RecipeModule } from "./recipe/recipe.module";


import { AppComponent } from './app.component';
import { AppRouteModule } from './app-router.module';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component'
import { AuthIntercepterService} from './recipe/auth/auth-interceptor.service'

import { RecipeService } from './recipe/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { DropdownDirective } from './shared/dropdown.directive';
import { LoadingSpinner } from './shared/loading-spinner/loading.component';
import { AuthComponent } from './recipe/auth/auth.component';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceHolderDirective } from './shared/placeholder/placeholder.directive';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    AuthComponent,
    LoadingSpinner,
    AlertComponent,
    PlaceHolderDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRouteModule,
    RecipeModule
  ],
  providers: [ShoppingListService, RecipeService,{ 
    provide:HTTP_INTERCEPTORS,
    useClass:AuthIntercepterService,
    multi:true}],
    
  bootstrap: [AppComponent],
  entryComponents:[AlertComponent]
})
export class AppModule { }
