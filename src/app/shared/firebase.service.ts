import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe/recipe.model';
import { RecipeService } from '../recipe/recipe.service';

@Injectable({providedIn:"root"}) //another way of adding any service to provider
export class BackendService{
    constructor(private http: HttpClient,private recipeService : RecipeService){}

    storeRecipe(){
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://recipeapp-c6b15.firebaseio.com/recipes.json',recipes).subscribe(
            res => {
                console.log(res);
            }
        );

    }

}