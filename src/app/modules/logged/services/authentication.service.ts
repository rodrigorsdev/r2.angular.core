import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageKeysEnum } from '../../shared/enums/local-storage-keys.enum';
import { UserAuthenticatedDto } from '../dtos/user-authenticated.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService  {

  constructor(
    private readonly _httpClient: HttpClient
  ) {
  }

   getAuthenticatedUser(): UserAuthenticatedDto | undefined {
    const user = localStorage.getItem(LocalStorageKeysEnum.user);
    return user === null ? undefined : JSON.parse(user);
  }

  removeAuthenticatedUser() {
    localStorage.removeItem(LocalStorageKeysEnum.user);
  }

  setAuthenticatedUser(dto: UserAuthenticatedDto) {
    localStorage.setItem(LocalStorageKeysEnum.user, JSON.stringify(dto));
  }
}