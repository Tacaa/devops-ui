import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Notification as AppNotification } from 'src/app/shared/models/notification.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl = 'http://localhost:8080/api/notifications';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserNotifications(): Observable<AppNotification[]> {
    return this.http.get<AppNotification[]>(
      `${this.apiUrl}/${this.authService.getUserId()}`
    );
  }

  setToRead(notifications: AppNotification[]): Observable<any> {
    return this.http.put(`${this.apiUrl}/read`, notifications);
  }
}
