import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private isExpanded = new BehaviorSubject<boolean>(false);
  private isCollapsed = new BehaviorSubject<boolean>(false);

  isExpanded$ = this.isExpanded.asObservable();
  isCollapsed$ = this.isCollapsed.asObservable();

  get isExpandedValue(): boolean {
    return this.isExpanded.value;
  }

  get isCollapsedValue(): boolean {
    return this.isCollapsed.value;
  }

  toggleMobileMenu(): void {
    this.isExpanded.next(!this.isExpanded.value);
    // Fecha automaticamente se estiver em modo collapsed
    if (this.isCollapsed.value) {
      this.isCollapsed.next(false);
    }
  }

  toggleCollapse(): void {
    this.isCollapsed.next(!this.isCollapsed.value);
    // Fecha o menu móvel se estiver aberto
    if (this.isExpanded.value) {
      this.isExpanded.next(false);
    }
  }
}