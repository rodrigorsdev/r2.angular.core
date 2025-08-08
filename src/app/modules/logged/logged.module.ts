import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LoggedComponent } from './logged.component';
import { LoggedRoutesModule } from './logged.routes';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FloatingMenuButtonComponent } from './components/floating-menu-button/floating-menu-button.component';
import { ConfirmDialogComponent } from '../shared/components/confirm-dialog/confirm-dialog.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { DateFormatPipe } from "../shared/pipes/date-format.pipe";
import { UserFormModalComponent } from './pages/user-form-modal/user-form-modal.component';

@NgModule({
    declarations: [
        LoggedComponent,
        NavbarComponent,
        SidebarComponent,
        FloatingMenuButtonComponent,
        ConfirmDialogComponent,
        UserListComponent,
        UserFormModalComponent,
    ],
    imports: [
    LoggedRoutesModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DateFormatPipe
],
    providers: [
        AuthGuard,
        provideHttpClient(withInterceptorsFromDi()),
    ]
})
export class LoggedModule { }
