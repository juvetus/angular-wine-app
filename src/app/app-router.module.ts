import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeComponent } from './recipe/recipe.component';
import { RecipeBeginComponent } from './recipe/recipe-begin/recipe-begin.component';
import { RecipeDetailsComponent } from './recipe/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesResolver } from './recipe/recipes.resolver.service';
import { AuthComponent } from './recipe/auth/auth.component';
import { AuthGuard } from './recipe/auth/auth-guard';



const routes : Routes =[
    {path: '', redirectTo : '/recipes', pathMatch:'full'},
    {path: 'recipes',
     component : RecipeComponent,
     canActivate:[AuthGuard],
     children :[
        { path:'', component: RecipeBeginComponent},
        { path:'new', component: RecipeEditComponent},
        { path:':id', component: RecipeDetailsComponent,resolve:[RecipesResolver]},
        { path:':id/edit', component: RecipeEditComponent,resolve:[RecipesResolver]},        
    ]},
    {path: 'shopping-list', component : ShoppingListComponent},
    {path: 'auth', component : AuthComponent},
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRouteModule{

}