import { Component } from '@angular/core';
import { ThemeService } from '../../../shared/services/theme.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../../../shared/services/sidebar.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: false,
})
export class NavbarComponent {

    constructor(
        public themeService: ThemeService,
        public sidebarService: SidebarService,
        public authenticationService: AuthenticationService,
        private _router: Router
    ) { }

    toggleTheme(): void {
        this.themeService.toggleTheme();
    }

    toggleSidebar(): void {
        this.sidebarService.toggleMobileMenu();
    }

    logout(): void {
        this.authenticationService.removeAuthenticatedUser();
        this._router.navigate(['/auth/login']);
    }
}