import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService} from './../auth/auth.service'
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceHolderDirective } from '../../shared/placeholder/placeholder.directive';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from './store/auth.actions';


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
    logInMode = false;
    isLoading = false;
    error: String;

    private alertdynSubs: Subscription;
    private storeSub: Subscription;

    @ViewChild(PlaceHolderDirective,{static:false}) alertHolder :PlaceHolderDirective; 

    constructor(private authService : AuthService,
        private router: Router,
        private compFacRes : ComponentFactoryResolver,
        private store: Store<fromApp.AppState>
        ){}

        ngOnInit() {
            this.storeSub = this.store.select('auth').subscribe(authState => {
              this.isLoading = authState.loading;
              this.error = authState.authError;
              if (this.error) {
                this.showAlertDynam(this.error);
              }
            });
          }    

    switchAuthMode(){
        this.logInMode = !this.logInMode;
    }
    handleAlertBox(){
        this.store.dispatch(new AuthActions.ClearError()); 
    }

    ngOnDestroy(){
        if(this.alertdynSubs){
            this.alertdynSubs.unsubscribe();
        }
        if (this.storeSub) {
            this.storeSub.unsubscribe();
        }
    }

    private showAlertDynam(message: String){
             
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
          console.log('autoload')
    }

    onAuthFormSubmit(authForm : NgForm){

        if (authForm.invalid){ return ;}

        const email = authForm.value.email;
        const password = authForm.value.password;
        this.isLoading = true;

      
        if(this.logInMode){
            //authObservable = this.authService.signIn(email,password);
            this.store.dispatch(
                new AuthActions.LoginStart({ email: email, password: password })
              );
        }else{
            this.store.dispatch(
                new AuthActions.SignupStart({ email: email, password: password })
              );
        }

     /*    authObservable.subscribe(res=>{
            this.isLoading = false;
            this.router.navigate(['/recipes']);
            this.autoLoadList();
        },defErrorMsg=>{
            this.isLoading = false;
            this.error = defErrorMsg;
            this.showAlertDynam(defErrorMsg);
        }); */

        authForm.reset();
    }
}