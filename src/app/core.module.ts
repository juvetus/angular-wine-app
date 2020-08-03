import { NgModule } from '@angular/core';
import { AuthIntercepterService} from './recipe/auth/auth-interceptor.service'

import {HTTP_INTERCEPTORS} from '@angular/common/http'

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        { 
        provide:HTTP_INTERCEPTORS,
        useClass:AuthIntercepterService,
        multi:true}
    ],
})
export class CoreModule { }
