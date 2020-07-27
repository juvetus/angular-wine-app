import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromShoppingList  from './store/shopping-list.reducer';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private idChange : Subscription;


  constructor(
    private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList'); 
  }

  editShoppingItem(id: number ){
    this.store.dispatch(new ShoppingListActions.StartEdit(id));  
  }

  ngOnDestroy(): void{

  }
}
