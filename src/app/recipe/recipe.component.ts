import { Component, OnInit } from '@angular/core';

import { RecipeService } from './recipe.service';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  providers: [RecipeService] //availing service to all childs of recipe comp
})
export class RecipeComponent implements OnInit{
   constructor() { } 

  ngOnInit() { }
}
