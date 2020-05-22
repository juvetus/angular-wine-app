import { NgModule } from '@angular/core';
import { LoadingSpinner } from './loading-spinner/loading.component';
import { AlertComponent } from './alert/alert.component';
import { PlaceHolderDirective } from './placeholder/placeholder.directive';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';



@NgModule({
    imports: [
        CommonModule
     ],
    exports: [
        LoadingSpinner,
        AlertComponent,
        PlaceHolderDirective,
        DropdownDirective,
        CommonModule
    ],
    declarations: [
        LoadingSpinner,
        AlertComponent,
        PlaceHolderDirective,
        DropdownDirective,
    ],
    providers: [],
    entryComponents:[AlertComponent]
})
export class SharedModule { }
