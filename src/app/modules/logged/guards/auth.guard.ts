import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router,
  ) { }

  canActivate(): boolean {
    if (!this._authenticationService.getAuthenticatedUser()) {
      this._authenticationService.removeAuthenticatedUser();
      this._router.navigate(['/anonymous/login']);
      return false;
    }

    return true;
  }
}