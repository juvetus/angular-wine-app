import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls:['./alert.component.css']
})
export class AlertComponent{
    @Input() alertMessage;
    @Output() hideAlert = new EventEmitter<void>();

    closeAlert(){
        this.hideAlert.emit();       
    }
}