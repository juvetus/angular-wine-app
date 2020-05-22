import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {  FormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        RouterModule,
        SharedModule,
        FormsModule,
        ShoppingListRoutingModule
    ],
    exports: [],
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    providers: [],
})
export class ShoppingListModule { }
