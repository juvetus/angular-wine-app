import {Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http'
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User} from './user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as AuthActions from './store/auth.actions';

export interface AuthResponse{
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean
}

@Injectable({providedIn : 'root'})
export class AuthService{

    private sessoionTimer:any;

    constructor(private http:HttpClient,
        private router: Router,
        private store: Store<fromApp.AppState>
        ){}

    user = new BehaviorSubject<User>(null); //allow access to previous and current token emitted

    signUp(email:string ,password :string){

        return this.http.post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.apikey,
            {
                email: email,
                password : password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.authErrorHandler),tap(resData=>{
            this.authHandler(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
            )
        }))
    }

    signIn(email:string ,password :string){

        return this.http.post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.apikey,
            {
                email: email,
                password : password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.authErrorHandler),tap(resData=>{
            this.authHandler(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
            )
        }))
    }

    logOut(){
        //this.user.next(null);
        this.store.dispatch(new AuthActions.Logout());
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.sessoionTimer){
            clearTimeout(this.sessoionTimer);
        }
        this.sessoionTimer =  null;
    }

    autoLogout(tokenExpirePeriod:number){
        this.sessoionTimer = setTimeout(() => {
            this.logOut();            
        }, tokenExpirePeriod);
    }

    autoLogin(){
        const userData : {
            email:string;
            id:string;
            _token:string;
            _tokenExpirePeriod:string;
        } = JSON.parse(localStorage.getItem('userData'));

        
        if(!userData){return;}

        const loggedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirePeriod),
            );
        
        if(loggedUser.token){
            //this.user.next(loggedUser);
            this.store.dispatch(
                new AuthActions.Login({
                  email: loggedUser.email,
                  userId: loggedUser.id,
                  token: loggedUser.token,
                  expirationDate: new Date(userData._tokenExpirePeriod)
                })
              );

            const newExpPeriod = new Date(userData._tokenExpirePeriod).getTime() - new Date().getTime();
            this.autoLogout(newExpPeriod);
        }    
    }

    private authHandler(
        email: string,
        localId : string,
        idToken :string,
        expiresIn : number
    ){
        const expirationPeriod = new Date(new Date().getTime() + expiresIn*1000);

        const user = new User(
            email,
            localId,
            idToken,
            expirationPeriod);
        //this.user.next(user);
        this.store.dispatch(
            new AuthActions.Login({
              email: email,
              userId: localId,
              token: idToken,
              expirationDate: expirationPeriod
            })
          );
        this.autoLogout(expiresIn*1000); 
        localStorage.setItem('userData', JSON.stringify(user)); 
    }

    private authErrorHandler(errRes:HttpErrorResponse){

        let defErrMessage = 'an error occured';
        if(!errRes.error || !errRes.error.error){ throwError(defErrMessage)}

        switch(errRes.error.error.message){
            
            case 'EMAIL_EXISTS':
                defErrMessage = 'The email address is already in use by another account.'
                break;
            case 'EMAIL_NOT_FOUND':
                defErrMessage = 'There is no user record corresponding to this credentials. The user may have been deleted '
                break;
            case 'INVALID_PASSWORD':
                defErrMessage = 'The password is invalid or the user does not have a password.'
                break;
            case 'USER_DISABLED':
                defErrMessage = 'The user account has been disabled by an administrator.'
                break;
            case 'OPERATION_NOT_ALLOWED':
                defErrMessage = 'Password sign-in is disabled for this project.'
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                defErrMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.'
                break;
        }

        return throwError(defErrMessage);
    }
}