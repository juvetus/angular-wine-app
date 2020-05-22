import { NgModule } from '@angular/core';

import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild([{path: 'auth', component : AuthComponent}]),
        SharedModule
    ],
    exports: [],
    declarations: [
        AuthComponent
    ],
    providers: [],
})
export class AuthModule { }
