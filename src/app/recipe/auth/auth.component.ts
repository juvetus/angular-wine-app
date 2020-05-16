import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService} from './../auth/auth.service'

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent{
    logInMode = false;

    constructor(private authService : AuthService){}

    switchAuthMode(){
        this.logInMode = !this.logInMode;
    }

    onAuthFormSubmit(authForm : NgForm){

        if (authForm.invalid){ return ;}


        const email = authForm.value.email;
        const password = authForm.value.password;
        if(this.logInMode){

        }else{
            this.authService.signUp(email,password).subscribe(res=>{
                console.log(res);
            },err=>{
                console.log(err);
            });
        }
        authForm.reset();
    }
}