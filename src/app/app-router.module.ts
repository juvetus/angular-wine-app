import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeComponent } from './recipe/recipe.component';
import { RecipeBeginComponent } from './recipe/recipe-begin/recipe-begin.component';
import { RecipeDetailsComponent } from './recipe/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';



const routes : Routes =[
    {path: '', redirectTo : '/recipes', pathMatch:'full'},
    {path: 'recipes', component : RecipeComponent ,children :[
        { path:'', component: RecipeBeginComponent},
        { path:'new', component: RecipeEditComponent},
        { path:':id', component: RecipeDetailsComponent},
        { path:':id/edit', component: RecipeEditComponent},        
    ]},
    {path: 'shopping-list', component : ShoppingListComponent},
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRouteModule{

}