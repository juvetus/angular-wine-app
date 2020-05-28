import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponse} from './../auth/auth.service'
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceHolderDirective } from '../../shared/placeholder/placeholder.directive';
import { BackendService } from '../../shared/firebase.service';


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
    logInMode = false;
    isLoading = false;
    error: String;

    private alertdynSubs: Subscription;

    @ViewChild(PlaceHolderDirective,{static:false}) alertHolder :PlaceHolderDirective; 

    constructor(private authService : AuthService,
        private router: Router,
        private compFacRes : ComponentFactoryResolver,
        private backendService : BackendService,
        ){}

    switchAuthMode(){
        this.logInMode = !this.logInMode;
    }
    handleAlertBox(){
        this.error = null; 
    }

    ngOnDestroy(){
        if(this.alertdynSubs){
            this.alertdynSubs.unsubscribe();
        }
    }

    private showAlertDynam(message: string){
             
        const alertCompFactory = this.compFacRes.resolveComponentFactory(AlertComponent);
        const alertHost = this.alertHolder.viewContainerRef;
     
        alertHost.clear();

        const alertComp = alertHost.createComponent(alertCompFactory);
        alertComp.instance.alertMessage = message;
        
        this.alertdynSubs = alertComp.instance.hideAlert.subscribe(()=>{
            this.alertdynSubs.unsubscribe();
            this.alertHolder.viewContainerRef.clear();
        })
        
    }

    private autoLoadList(){
          this.backendService.fetchRecipe().subscribe();
    }

    onAuthFormSubmit(authForm : NgForm){

        if (authForm.invalid){ return ;}

        const email = authForm.value.email;
        const password = authForm.value.password;
        this.isLoading = true;

        let authObservable : Observable<AuthResponse>; 

        if(this.logInMode){
            authObservable = this.authService.signIn(email,password);
        }else{
            authObservable= this.authService.signUp(email,password);
        }

        authObservable.subscribe(res=>{
            this.isLoading = false;
            this.router.navigate(['/recipes']);
            this.autoLoadList();
        },defErrorMsg=>{
            this.isLoading = false;
            this.error = defErrorMsg;
            this.showAlertDynam(defErrorMsg);
        });

        authForm.reset();
    }
}