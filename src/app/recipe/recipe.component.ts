import { Component, OnInit } from '@angular/core';
import {Recipe} from './recipe.model';
import { RecipeService } from './recipe.service';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  providers: [RecipeService] //availing service to all childs of recipe comp
})
export class RecipeComponent implements OnInit{
  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService) { } //to make sure the same instance is used

  ngOnInit() {
    this.recipeService.recipeSelected
      .subscribe(
        (recipe: Recipe) => {
          /* updates accordingly to recipe select event */
          this.selectedRecipe = recipe;
        }
      );
  }
}
