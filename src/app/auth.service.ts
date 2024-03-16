import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'isLoggedIn';

  constructor() {}

  login(username: string, password: string): boolean {
    // Lógica para verificar las credenciales
    if (username === 'admin' && password === 'password') {
      localStorage.setItem(this.STORAGE_KEY, 'true');
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) === 'true';
  }
}
