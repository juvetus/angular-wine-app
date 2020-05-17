import { Component, OnInit, OnDestroy} from '@angular/core';
import { BackendService } from '../shared/firebase.service';
import { AuthService } from '../recipe/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
    private userSubs : Subscription;
    isAuthenticated: boolean = false;

    constructor( private backendService : BackendService,
                 private authService: AuthService,
                 private router: Router){}

     ngOnInit(){
         this.userSubs = this.authService.user.subscribe(user=>{
             this.isAuthenticated = !!user;
         }
         );
     }            

    onSave(){
        this.backendService.storeRecipe();
    }
    onFetch(){
        this.backendService.fetchRecipe().subscribe();
    }

    onLogOut(){
        this.authService.logOut();
        this.router.navigate(['/auth']);
    }

    ngOnDestroy(){
        this.userSubs.unsubscribe();
    }

}