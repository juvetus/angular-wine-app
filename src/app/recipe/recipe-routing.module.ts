import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeComponent } from './recipe.component';
import { RecipeBeginComponent } from './recipe-begin/recipe-begin.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipesResolver } from './recipes.resolver.service';
import { AuthGuard } from './auth/auth-guard';

const routes : Routes = [
    {path: '',
       component : RecipeComponent,
       canActivate:[AuthGuard],
    children :[
        { path:'', component: RecipeBeginComponent},
        { path:'new', component: RecipeEditComponent},
        { path:':id', component: RecipeDetailsComponent,resolve:[RecipesResolver]},
        { path:':id/edit', component: RecipeEditComponent,resolve:[RecipesResolver]},        
]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipeRoutesModule { }
