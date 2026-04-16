import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class TokenStorageService {

  private readonly ACCESS_TOKEN_KEY = "access_token";

  // get access token
  getToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  // save access token
  setToken(token: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  // remove access token
  clearToken(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }

  // check access token exists
  hasSession(): boolean {
    return !!this.getToken();
  }
}
