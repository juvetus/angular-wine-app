import { Component } from '@angular/core';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent{
    logInMode = false;

    switchAuthMode(){
        this.logInMode = !this.logInMode;
    }
}