import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ThemeService } from '../../../shared/services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  loading = false; // Exemplo de estado de carregamento

  constructor(
    public themeService: ThemeService,
  ) {}

  // Exemplo de método de ação
  onAction() {
    this.loading = true;
    // Simula uma operação assíncrona
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }
}