import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeService } from '../../shared/services/theme.service';
import { MessageService } from '../../shared/services/message.service';
import { LocalStorageKeysEnum } from '../../shared/enums/local-storage-keys.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent implements OnInit {

  showSessionExpired = false;

  form: FormGroup;
  loading = false;
  showPassword = false;
  showInstallButton = false;
  private deferredPrompt: any;

  constructor(
    public themeService: ThemeService,
    private fb: FormBuilder,
    private _router: Router,
    private _renderer: Renderer2,
    private _messageService: MessageService,
    private _route: ActivatedRoute,
  ) {

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this._passwordValidator()]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {

    this.showSessionExpired = this._route.snapshot.queryParams['sessionExpired'] === 'true';

    if (this.showSessionExpired) {

      this._messageService.warning('Sessão expirada. Por favor, faça login novamente.', {
        duration: 5000
      });

      this._router.navigate([], {
        queryParams: { sessionExpired: null },
        queryParamsHandling: 'merge'
      });
    }

    this.setupPWAInstallPrompt();
    this._loadRememberedCredentials();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  hasUpperCase(): boolean {
    const value = this.form.get('password')?.value;
    return value && /[A-Z]/.test(value);
  }

  hasLowerCase(): boolean {
    const value = this.form.get('password')?.value;
    return value && /[a-z]/.test(value);
  }

  hasNumber(): boolean {
    const value = this.form.get('password')?.value;
    return value && /[0-9]/.test(value);
  }

  hasSpecialChar(): boolean {
    const value = this.form.get('password')?.value;
    return value && /[!@#$%^&*(),.?":{}|<>]/.test(value);
  }

  onSubmit() {

    if (this.form.invalid) {
      this._messageService.warning('Por favor, preencha todos os campos corretamente.');
      return;
    }

    this.loading = true;
    this.showSessionExpired = false;

    const email = this.form.get('email')?.value ?? '';
    const password = this.form.get('password')?.value ?? '';
    const rememberMe = this.form.get('rememberMe')?.value ?? false;

    if (rememberMe) {
      this._saveCredentials(email, password);
    } else {
      this._clearCredentials();
    }

    this._router.navigate(['/logged/home']);
  }

  setupPWAInstallPrompt() {
    // Verifica se já está instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.showInstallButton = false;
      return;
    }

    // Para navegadores que suportam beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton = true;
    });

    // Para iOS
    this.checkIosInstallPrompt();
  }

  checkIosInstallPrompt() {
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };

    const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator['standalone']);

    if (isIos() && !isInStandaloneMode()) {
      this.showInstallButton = true;
    }
  }

  installPWA() {

    if (this.deferredPrompt) {
      // Mostra o prompt de instalação
      this.deferredPrompt.prompt();

      // Aguarda o usuário responder ao prompt
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuário aceitou a instalação');
        } else {
          console.log('Usuário recusou a instalação');
        }
        this.deferredPrompt = null;
        this.showInstallButton = false;
      });
    } else {
      // Para iOS ou navegadores que não suportam o beforeinstallprompt
      this._messageService.warning('Para instalar o app, use o menu de compartilhamento e selecione "Adicionar à tela inicial".', { duration: 5000 });
    }
  }

  private _passwordValidator() {
    return (control: { value: string }) => {
      const value = control.value;
      if (!value) return null;

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      const valid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
      return valid ? null : { passwordStrength: true };
    };
  }

  private _saveCredentials(email: string, password: string): void {

    localStorage.setItem(LocalStorageKeysEnum.rememberedEmail, email);
    const encryptedPassword = btoa(password); 
    localStorage.setItem(LocalStorageKeysEnum.rememberedPassword, encryptedPassword);
  }

  private _loadRememberedCredentials(): void {

    const rememberedEmail = localStorage.getItem(LocalStorageKeysEnum.rememberedEmail);
    const rememberedPassword = localStorage.getItem(LocalStorageKeysEnum.rememberedPassword);

    if (rememberedEmail && rememberedPassword) {
      try {
        const decryptedPassword = atob(rememberedPassword); // Base64 decoding
        this.form.patchValue({
          email: rememberedEmail,
          password: decryptedPassword,
          rememberMe: true
        });
      } catch (e) {
        this._clearCredentials();
      }
    }
  }

  private _clearCredentials(): void {
    localStorage.removeItem(LocalStorageKeysEnum.rememberedEmail);
    localStorage.removeItem(LocalStorageKeysEnum.rememberedPassword);
  }
}