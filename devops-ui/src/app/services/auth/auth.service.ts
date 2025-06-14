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
  private userIdKey = 'userId';
  private userRoleKey = 'userRole';
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
          this.setUserData(user); // ✅ Store user ID & role in localStorage
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

  setUserData(user: CurrentUser) {
    if (user.id !== undefined && user.id !== null) {
      localStorage.setItem(this.userIdKey, user.id.toString());
    } else {
      console.warn('User ID is undefined or null.');
    }

    if (user.role) {
      localStorage.setItem(this.userRoleKey, user.role);
    } else {
      console.warn('User role is undefined.');
    }
  }

  clearUserData() {
    localStorage.removeItem(this.userIdKey);
    localStorage.removeItem(this.userRoleKey);
  }

  getUserId(): number | null {
    const userId = localStorage.getItem(this.userIdKey);
    return userId ? parseInt(userId, 10) : null;
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.userRoleKey);
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
      this.clearUserData();
      this.currentUserSubject.next(null);
      this.router.navigate(['/login']);
    });
  }

  register(user: UserRegisterRequest) {
    this.http
      .post<{ accessToken: string }>(`${this.apiUrl}/register`, user)
      .subscribe((response) => {
        this.setToken(response.accessToken);
        this.restoreUser(); // ✅ Fetch and set user immediately after register
        this.router.navigate(['']);
      });
  }
}
