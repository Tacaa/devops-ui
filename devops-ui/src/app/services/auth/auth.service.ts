import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  login(username: string, password: string) {
    this.http
      .post<{ accessToken: string; expiresIn: number }>(
        `${this.apiUrl}/login`,
        {
          username,
          password,
        }
      )
      .subscribe((response) => {
        this.setToken(response.accessToken);
        this.router.navigate(['']); // Redirect to homepage after login
      });
  }

  logout() {
    this.http.post<Response>(`${this.apiUrl}/logout`, null);
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
