import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { RecipeService } from './../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editmode : boolean = false;
  recipe_id : number;

  newRecipeForm:FormGroup;

  constructor(private route : ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) =>{
        this.recipe_id = +params['id'];
        this.editmode = params['id'] != null; //turns edit mode t only when id is valid number
        this.generateForm();
      }
    )
  }

  onSubmit(){}
  

  private generateForm(){
    let recipeName;
    let recipeImgPath;
    let recipeDesc;

    if(this.editmode){
      const recipe = this.recipeService.getRecipeById(this.recipe_id);
      recipeName = recipe.name;
      recipeDesc = recipe.description;
      recipeImgPath = recipe.imagePath;
    }
    
    this.newRecipeForm = new FormGroup({
      name: new FormControl(recipeName),
      description: new FormControl(recipeDesc),
      imagepath: new FormControl(recipeImgPath)
    });
  }



}
