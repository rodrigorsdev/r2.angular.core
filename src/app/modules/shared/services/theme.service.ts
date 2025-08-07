import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

   private readonly THEME_KEY = 'user_theme';
    private darkMode = false;
    private renderer: Renderer2;

    constructor(
        rendererFactory: RendererFactory2,
    ) {
        this.renderer = rendererFactory.createRenderer(null, null);
        this.loadThemePreference();
    }

    private loadThemePreference(): void {
        const savedTheme = localStorage.getItem(this.THEME_KEY);
        if (savedTheme) {
            this.darkMode = savedTheme === 'dark';
        }
        this.applyTheme();
    }

    toggleTheme(): void {
        this.darkMode = !this.darkMode;
        this.applyTheme();
        localStorage.setItem(this.THEME_KEY, this.darkMode ? 'dark' : 'light');
    }

    applyTheme(): void {
        const theme = this.darkMode ? 'dark' : 'light';
        this.renderer.setAttribute(document.documentElement, 'data-theme', theme);
    }

    isDarkMode(): boolean {
        return this.darkMode;
    }
}