import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipe/recipe.model';
import { RecipeService } from '../recipe/recipe.service';
import { map,tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../recipe/auth/auth.service';



@Injectable({providedIn:"root"}) //another way of adding any service to provider
export class BackendService{
    constructor(private http: HttpClient,
                private recipeService : RecipeService,
                private authService : AuthService){}

    storeRecipe(){
        const recipes = this.recipeService.getRecipes();
        this.http.put(
            'https://recipeapp-c6b15.firebaseio.com/recipes.json',
            recipes).subscribe(
            res => {
                console.log(res);
            }
        );

    }

    fetchRecipe(){
        /* takes only one value from user obsesrvable
        exhaust map replaces the user observable with get recipe in the obeservable chain,once its over */
       return this.authService.user.pipe(take(1),
        exhaustMap(user=>{
            return this.http.get<Recipe[]>(
                'https://recipeapp-c6b15.firebaseio.com/recipes.json',{
                    params: new HttpParams().set('auth',user.token)
                }
                );
        }),map(recipes =>{
                return recipes.map(recipe =>{
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients :[]
                    }
                });
            }),tap(res=>{
                this.recipeService.setFetchedRecipes(res);
            })    
        );
    }
}