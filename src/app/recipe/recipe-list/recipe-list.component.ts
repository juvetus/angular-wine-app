import { Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];
  recipeSubscription: Subscription;

  constructor(private router : Router,
              private route : ActivatedRoute,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(){
    this.recipeSubscription=this.store
    .select('recipes')
    .pipe(map(recipesState => recipesState.recipes))
    .subscribe(
      (recipe: Recipe[]) =>{
        this.recipes = recipe;
      }
    )
  }

  newRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }

}
