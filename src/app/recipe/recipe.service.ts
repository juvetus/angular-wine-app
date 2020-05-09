import { Recipe } from './recipe.model';


export class RecipeService {

    private recipes: Recipe[] = [
        new Recipe('chicken biriyani', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
        new Recipe('porotta and beef', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')
      ];

      getRecipes() {
        return this.recipes.slice(); //dont want to return the original array ,only copys
      }  


}