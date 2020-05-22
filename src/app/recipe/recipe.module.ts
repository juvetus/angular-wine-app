import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeRoutesModule } from "./recipe-routing.module";

import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeBeginComponent } from './recipe-begin/recipe-begin.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeComponent } from './recipe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    imports: [
        RouterModule,
        ReactiveFormsModule,
        RecipeRoutesModule,
        SharedModule
    ],
    exports: [ ],
    declarations: [
        RecipeBeginComponent,
        RecipeEditComponent,
        RecipeComponent,
        RecipeListComponent,
        RecipeDetailsComponent,
        RecipeItemComponent,
    ],
    providers: [],
})
export class RecipeModule { }
