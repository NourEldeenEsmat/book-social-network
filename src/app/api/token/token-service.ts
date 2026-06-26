import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public removeToken(): void {
    return localStorage.removeItem('token');
  }

  public parseToken(token: string): Record<string, unknown> | null {
    if (!token) {
      return null;
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    try {
      const payload = parts[1];
      const decoded = atob(this.padBase64(payload.replace(/-/g, '+').replace(/_/g, '/')));
      return JSON.parse(decoded) as Record<string, unknown>;
    } catch {
      return null;
    }
  }

  public getUsernameFromToken(token?: string): string | null {
    const actualToken = token ?? this.getToken();
    if (!actualToken) {
      return null;
    }

    const payload = this.parseToken(actualToken);
    if (!payload) {
      return null;
    }

    const username = payload['fullName'] ?? payload['sub'];
    return typeof username === 'string' ? username : null;
  }

  private padBase64(value: string): string {
    const padding = value.length % 4;
    return padding === 0 ? value : value + '='.repeat(4 - padding);
  }
}
