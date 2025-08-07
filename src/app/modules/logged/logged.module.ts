import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LoggedComponent } from './logged.component';
import { LoggedRoutesModule } from './logged.routes';

@NgModule({
    declarations: [
        LoggedComponent,
    ],
    imports: [
        LoggedRoutesModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        AuthGuard,
        provideHttpClient(withInterceptorsFromDi()),
    ]
})
export class LoggedModule { }
