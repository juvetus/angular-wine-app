import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { FormGroup, FormControl, Validators,FormArray } from '@angular/forms';
import { RecipeService } from './../recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editmode : boolean = false;
  recipe_id : number;

  newRecipeForm:FormGroup;


  get ingredientsControls() {
    return (this.newRecipeForm.get('ingredients') as FormArray).controls;
  }

  constructor(private route : ActivatedRoute,
              private recipeService: RecipeService,
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
      this.recipeService.updateRecipe(this.recipe_id, this.newRecipeForm.value);
    } else {
      this.recipeService.addRecipe(this.newRecipeForm.value);
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
  

  private generateForm(){
    let recipeName;
    let recipeImgPath;
    let recipeDesc;
    let recipeIngredients = new FormArray([]);

    if(this.editmode){
      const recipe = this.recipeService.getRecipeById(this.recipe_id);
      recipeName = recipe.name;
      recipeDesc = recipe.description;
      recipeImgPath = recipe.imagePath;
      recipeDesc = recipe.description;

      if(recipe['ingredients']){
        for(let ingred of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingred.name,Validators.required),
              'amount': new FormControl(ingred.amount,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
          })
        );
        
        }
      }

      
    }
    
    this.newRecipeForm = new FormGroup({
      name: new FormControl(recipeName,Validators.required),
      description: new FormControl(recipeDesc,Validators.required),
      imagePath: new FormControl(recipeImgPath,Validators.required),
      ingredients:recipeIngredients
    });
  }



}
