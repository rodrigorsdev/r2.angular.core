import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { LocalStorageKeysEnum } from '../../shared/enums/local-storage-keys.enum';
import { LoggerService } from '../../shared/services/logger.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private _authenticationService: AuthenticationService,
        private _router: Router,
        private _loggerService: LoggerService,
    ) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {

                this._loggerService.debug('', error);

                if (error.status === 401) {
                    // Centraliza a lógica de logout no AuthService
                    this._authenticationService.removeAuthenticatedUser();
                    localStorage.removeItem(LocalStorageKeysEnum.homeState);
                    // Não redireciona diretamente, pois o AuthGuard já faz isso
                    // Apenas força a verificação do AuthGuard

                    this._router.navigate(['/an/login'], {
                        queryParams: { sessionExpired: 'true' }
                    }); // Redireciona para rota raiz que será protegida
                }
                  return throwError(() => error);
            })
        );
    }
}