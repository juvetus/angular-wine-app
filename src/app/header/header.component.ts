import { Component, EventEmitter,Output } from '@angular/core';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})
export class HeaderComponent{


    @Output() selectedComponent = new EventEmitter<string>(); //an event to which app can listen

    onSelect(selectedComp:string){
        this.selectedComponent.emit(selectedComp)
    }

}