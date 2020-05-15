import { Subject } from 'rxjs/';
import { Injectable} from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor(private shoppinglistService: ShoppingListService) {}    

    getRecipes() {
      return this.recipes.slice(); //dont want to return the original array ,only copys
      }
    getRecipeById(id:number){
      return this.recipes[id];
    }
    
    addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.shoppinglistService.addIngredients(ingredients);
      }

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
      }

    updateRecipe(index: number, newRecipe: Recipe){
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
      }
          
      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
        }

      setFetchedRecipes(recipe : Recipe[]){
        this.recipes = recipe;
        this.recipesChanged.next(this.recipes.slice());
      }  
}
