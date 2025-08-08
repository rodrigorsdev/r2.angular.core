import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../shared/services/theme.service';
import { SidebarService } from '../shared/services/sidebar.service';
import { debounceTime, fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrl: './logged.component.scss',
  standalone: false,
})
export class LoggedComponent implements OnInit {

  private resizeSub!: Subscription;
  private sidebarStateSub!: Subscription;
  isMobileView = false;

  constructor(
    public sidebarService: SidebarService,
    public themeService: ThemeService,
  ) { }

  ngOnInit(): void {
    this.checkViewport();
    this.setupResizeListener();
    this.setupSidebarListener();
  }

  ngOnDestroy(): void {
    this.cleanupSubscriptions();
  }

  private checkViewport(): void {
    this.isMobileView = window.innerWidth < 992;
    if (!this.isMobileView && this.sidebarService.isExpandedValue) {
      this.sidebarService.toggleMobileMenu();
    }
  }

  private setupResizeListener(): void {
    this.resizeSub = fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(() => {
        const wasMobile = this.isMobileView;
        this.isMobileView = window.innerWidth < 992;

        // Fecha o menu se mudou para desktop estando expandido
        if (wasMobile && !this.isMobileView && this.sidebarService.isExpandedValue) {
          this.sidebarService.toggleMobileMenu();
        }
      });
  }

  private setupSidebarListener(): void {
    this.sidebarStateSub = this.sidebarService.isExpanded$.subscribe(expanded => {
      if (expanded && !this.isMobileView) {
        this.sidebarService.toggleMobileMenu();
      }
    });
  }

  private cleanupSubscriptions(): void {
    if (this.resizeSub) {
      this.resizeSub.unsubscribe();
    }
    if (this.sidebarStateSub) {
      this.sidebarStateSub.unsubscribe();
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleSidebar(): void {
    this.sidebarService.toggleMobileMenu();
  }
}
