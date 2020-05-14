import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];
  recipeSubscription: Subscription;

  constructor(private recipeService: RecipeService,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit(){
    this.recipeSubscription=this.recipeService.recipesChanged.subscribe(
      (recipe: Recipe[]) =>{
        this.recipes = recipe;
      }
    )

    this.recipes = this.recipeService.getRecipes();
  }

  newRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }

}
