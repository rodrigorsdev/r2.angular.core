import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { LoggerService } from '../../shared/services/logger.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _loggerService: LoggerService,
  ) { }

  canActivate(): boolean {

    const authenticatedUser = this._authenticationService.getAuthenticatedUser();

    this._loggerService.debug('authenticatedUser', authenticatedUser);

    if (!authenticatedUser) {
      this._authenticationService.removeAuthenticatedUser();
      this._loggerService.debug('user not authenticated');
      this._router.navigate(['/anonymous/login']);
      return false;
    }
    this._loggerService.debug('user authenticated');
    return true;
  }
}