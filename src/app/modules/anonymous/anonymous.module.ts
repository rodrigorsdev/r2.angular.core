import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AnonymousComponent } from './anonymous.component';
import { AnonymousRoutesModule } from './anonymous.routes';

@NgModule({
    declarations: [
        AnonymousComponent,
        LoginComponent,
    ],
    imports: [
        AnonymousRoutesModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
    ]
})
export class AnonymousModule { }
