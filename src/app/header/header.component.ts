import { Component} from '@angular/core';
import { BackendService } from '../shared/firebase.service';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})
export class HeaderComponent{

    constructor( private backendService : BackendService){}

    onSave(){
        this.backendService.storeRecipe();
    }
    onFetch(){
        this.backendService.fetchRecipe();
    }

}