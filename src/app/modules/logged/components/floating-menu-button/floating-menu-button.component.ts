import { Component, OnInit, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { SidebarService } from '../../../shared/services/sidebar.service';
import { ThemeService } from '../../../shared/services/theme.service';

@Component({
    selector: 'app-floating-menu-button',
    templateUrl: './floating-menu-button.component.html',
    styleUrls: ['./floating-menu-button.component.scss'],
    standalone: false,
})
export class FloatingMenuButtonComponent implements OnInit, OnDestroy {
    isMobileView = false;
    private resizeSub!: Subscription;

    constructor(
        public sidebarService: SidebarService,
        public themeService: ThemeService,
    ) { }

    ngOnInit(): void {
        this.checkViewport();
        this.resizeSub = fromEvent(window, 'resize')
            .pipe(debounceTime(100))
            .subscribe(() => this.checkViewport());
    }

    ngOnDestroy(): void {
        if (this.resizeSub) {
            this.resizeSub.unsubscribe();
        }
    }

    checkViewport(): void {
        this.isMobileView = window.innerWidth < 992;
    }

    toggleSidebar(): void {
        this.sidebarService.toggleMobileMenu();
    }
}