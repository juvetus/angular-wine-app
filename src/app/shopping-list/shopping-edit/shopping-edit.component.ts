import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy{

  @ViewChild ('f') shopListForm : NgForm;

  private editSubs:Subscription;
  editMode = false;
  editItemId : number;
  editedItem : Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
   this.editSubs = this.slService.editShopItemId.subscribe(
     (itemId : number) => {
      this.editItemId = itemId;
      this.editMode = true;
      this.editedItem = this.slService.getIngredient(this.editItemId);
      this.shopListForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount        
      })
     }
   );
  }

  onAddItem(form : NgForm) {
    console.log(form)
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editItemId,newIngredient);
    }else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClearForm(){
    this.shopListForm.reset();
    this.editMode = false;
  }

  onDeleteForm(){
    this.slService.deleteIngredient(this.editItemId);
    this.onClearForm();
  }

  ngOnDestroy(){
    this.editSubs.unsubscribe();
  }

}
