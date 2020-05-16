import {Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponse{
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string
}

@Injectable({providedIn : 'root'})
export class AuthService{

    constructor(private http:HttpClient){}

    signUp(email:string ,password :string){

        return this.http.post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB4l-OuYgcT8FobdjXgqwKqj9bNRwUEoFQ',
            {
                email: email,
                password : password,
                returnSecureToken: true
            }
        ).pipe(catchError(
            errRes =>{

                let defErrMessage = 'an error occured';
                if(!errRes.error || !errRes.error.error){ throwError(defErrMessage)}

                switch(errRes.error.error.message){
                    case 'EMAIL_EXISTS':
                    defErrMessage = 'The email address is already in use by another account.'
                }

               return throwError(defErrMessage);
            }
        ))
    }
}