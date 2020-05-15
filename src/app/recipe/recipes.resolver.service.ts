/* to avoid routing to non existing recipe ids */

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { BackendService } from '../shared/firebase.service';
import { RecipeService } from './recipe.service';

@Injectable({providedIn:"root"})
export class RecipesResolver implements Resolve<Recipe[]>{
    constructor(private backendService : BackendService,
                private recipeService : RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state:RouterStateSnapshot){
        
        const recipe = this.recipeService.getRecipes();
        if (recipe.length === 0){
            return this.backendService.fetchRecipe();
        }else{
            return recipe;
        }
    }
}