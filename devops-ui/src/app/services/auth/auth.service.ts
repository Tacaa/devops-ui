import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  CurrentUser,
  UserRegisterRequest,
} from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';
  private apiUrl = 'http://localhost:8080/api/auth';
  private currentUserSubject = new BehaviorSubject<CurrentUser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  restoreUser() {
    const token = this.getToken();
    if (token) {
      this.http.get<CurrentUser>(`${this.apiUrl}/current-user`).subscribe(
        (user) => {
          this.currentUserSubject.next(user);
        },
        (error) => {
          console.error('Failed to restore user:', error);
          this.logout();
        }
      );
    }
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  login(username: string, password: string) {
    this.http
      .post<{ accessToken: string }>(`${this.apiUrl}/login`, {
        username,
        password,
      })
      .subscribe((response) => {
        this.setToken(response.accessToken);
        this.restoreUser(); // ✅ Fetch and set user immediately after login
        this.router.navigate(['']);
      });
  }

  logout() {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe(() => {
      localStorage.removeItem(this.tokenKey);
      this.currentUserSubject.next(null);
      this.router.navigate(['/login']);
    });
  }

  register(user: UserRegisterRequest) {
    this.http
      .post<{ accessToken: string }>(`${this.apiUrl}/register`, user)
      .subscribe((response) => {
        this.setToken(response.accessToken);
        this.restoreUser(); // ✅ Fetch and set user immediately after login
        this.router.navigate(['']);
      });
  }
}
