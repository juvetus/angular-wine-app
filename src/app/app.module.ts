import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'

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
    SharedModule,
    CoreModule,
  ],
  providers: [],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
