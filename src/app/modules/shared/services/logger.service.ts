import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LoggerService {

    private isDevMode = !environment.production;

private _getCallerInfo(): { className: string; methodName: string } {
    try {
      const stack = new Error().stack || '';
      const stackLines = stack.split('\n');
      
      // A linha relevante geralmente é a terceira (índice 2 ou 3)
      const callerLine = stackLines[3] || stackLines[2];
      
      // Extrai o nome da classe e método (depende do formato do stack trace)
      const match = callerLine.match(/at (\w+)\.(\w+) /);
      
      return {
        className: match?.[1] || 'UnknownClass',
        methodName: match?.[2] || 'unknownMethod',
      };
    } catch (e) {
      return { className: 'UnknownClass', methodName: 'unknownMethod' };
    }
  }

   log(message: string, data?: any): void {
    if (this.isDevMode) {
      const { className, methodName } = this._getCallerInfo();
      console.log(`[${className}.${methodName}] ${message}`, data || '');
    }
  }

  warn(message: string, data?: any): void {
    if (this.isDevMode) {
      const { className, methodName } = this._getCallerInfo();
      console.warn(`[${className}.${methodName}] ${message}`, data || '');
    }
  }

  error(message: string, data?: any): void {
    if (this.isDevMode) {
      const { className, methodName } = this._getCallerInfo();
      console.error(`[${className}.${methodName}] ${message}`, data || '');
    }
  }

  debug(message: string, data?: any): void {
    if (this.isDevMode) {
      const { className, methodName } = this._getCallerInfo();
      console.debug(`[${className}.${methodName}] ${message}`, data || '');
    }
  }
}