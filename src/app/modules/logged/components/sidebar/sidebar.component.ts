import { Component, HostListener } from '@angular/core';
import { ThemeService } from '../../../shared/services/theme.service';
import { SidebarService } from '../../../shared/services/sidebar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: false,
})
export class SidebarComponent {
  isMobileView = false;

  constructor(
    public sidebarService: SidebarService,
    public themeService: ThemeService,
    private _router: Router
  ) {
    this.checkViewport();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkViewport();
  }

  private checkViewport() {
    this.isMobileView = window.innerWidth < 992;
    if (!this.isMobileView && this.sidebarService.isExpandedValue) {
      this.sidebarService.toggleMobileMenu();
    }
  }

  // Método restaurado para navegação com fechamento automático
  navigateAndClose(route: string): void {
    this._router.navigate([route]).then(() => {
      if (this.isMobileView) {
        this.sidebarService.toggleMobileMenu();
      }
    });
  }

  closeSidebar(): void {
    if (this.isMobileView) {
      this.sidebarService.toggleMobileMenu();
    }
  }

  // Método para verificar rota ativa
  isActive(route: string): boolean {
    return this._router.isActive(route, {
      paths: 'subset',
      queryParams: 'subset',
      fragment: 'ignored',
      matrixParams: 'ignored'
    });
  }
}