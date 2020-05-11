import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editmode : boolean = false;
  recipe_id : number ;

  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) =>{
        this.recipe_id = +params['id'];
        this.editmode = params['id'] != null; //turns edit mode t only when id is valid number
        console.log(this.editmode);
      }
    )
  }

}
