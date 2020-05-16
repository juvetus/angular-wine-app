import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent{
    logInMode = false;

    switchAuthMode(){
        this.logInMode = !this.logInMode;
    }

    onAuthFormSubmit(authForm : NgForm){
        console.log(authForm.value);
        authForm.reset();
    }
}