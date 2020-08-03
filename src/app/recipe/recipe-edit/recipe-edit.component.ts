import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { FormGroup, FormControl, Validators,FormArray } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editmode : boolean = false;
  recipe_id : number;
  newRecipeForm:FormGroup;
  private storeSub: Subscription;

  get ingredientsControls() {
    return (this.newRecipeForm.get('ingredients') as FormArray).controls;
  }

  constructor(private route : ActivatedRoute,
    private store: Store<fromApp.AppState>,
              private router:Router) { }

  ngOnInit(): void {
    this.route.params.
    subscribe(
      (params:Params) =>{
        this.recipe_id = +params['id'];
        this.editmode = params['id'] != null; //turns edit mode t only when id is valid number
        this.generateForm();
      }
    )
  }

  onSubmit(){
    if (this.editmode) {
      this.store.dispatch(
        new RecipesActions.UpdateRecipe({
          index: this.recipe_id ,
          newRecipe: this.newRecipeForm.value
        })
      );
    } else {
      this.store.dispatch(new RecipesActions.AddRecipe(this.newRecipeForm.value));
    }
    this.onCancel();
  }

  onAddIngredient(){
    (<FormArray>this.newRecipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(i:number){
    (<FormArray>this.newRecipeForm.get('ingredients')).removeAt(i);
    }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
  
  private generateForm(){
    let recipeName;
    let recipeImgPath;
    let recipeDesc;
    let recipeIngredients = new FormArray([]);

    if(this.editmode){
      this.storeSub = this.store
      .select('recipes')
      .pipe(
        map(recipeState => {
          return recipeState.recipes.find((recipe, index) => {
            return index === this.recipe_id;
          });
        })
      )
      .subscribe(recipe => {
        recipeName = recipe.name;
        recipeImgPath = recipe.imagePath;
        recipeDesc = recipe.description;
        if (recipe['ingredients']) {
          for (let ingredient of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                name: new FormControl(ingredient.name, Validators.required),
                amount: new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            );
          }
        }
      });
    }
    
    this.newRecipeForm = new FormGroup({
      name: new FormControl(recipeName,Validators.required),
      description: new FormControl(recipeDesc,Validators.required),
      imagePath: new FormControl(recipeImgPath,Validators.required),
      ingredients:recipeIngredients
    });
  }
}
