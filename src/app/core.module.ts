import { NgModule } from '@angular/core';
import { AuthIntercepterService} from './recipe/auth/auth-interceptor.service'

import { RecipeService } from './recipe/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http'

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        ShoppingListService,
        RecipeService,
        { 
        provide:HTTP_INTERCEPTORS,
        useClass:AuthIntercepterService,
        multi:true}
    ],
})
export class CoreModule { }
