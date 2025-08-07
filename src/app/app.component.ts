import { Component, OnInit } from '@angular/core';
import { ThemeService } from './modules/shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {

  title = 'r2.angular.core';

  constructor(
    private themeService: ThemeService,
  ) { }

  ngOnInit(): void {
    this.themeService.isDarkMode();
  }
}