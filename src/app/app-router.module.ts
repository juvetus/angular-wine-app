import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes : Routes =[
    {path: '', redirectTo : '/recipes', pathMatch:'full'},
    {path:'recipes', loadChildren: ()=> (import('./recipe/recipe.module').then(
        mdl => mdl.RecipeModule
    ))},
    {path: 'shopping-list',loadChildren: ()=> (import('./shopping-list/shopping-list-module').then(
        mdl => mdl.ShoppingListModule
    )) },
    {path: 'auth',loadChildren: ()=> (import('./recipe/auth/auth.module').then(
        mdl => mdl.AuthModule
    )) }
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRouteModule{}