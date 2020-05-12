import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Ingredient[];
  private idChange : Subscription;


  constructor(private shoplistService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoplistService.getIngredients();
    this.idChange = this.shoplistService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  editShoppingItem(id: number ){
    this.shoplistService.editShopItemId.next(id);    
  }

  ngOnDestroy(): void{
    this.idChange.unsubscribe();
  }
}
