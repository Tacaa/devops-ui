import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { NotificationsPreferences } from 'src/app/shared/models/notification-preferences.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationPreferenceService {
  private apiUrl = 'http://localhost/api/notifications-preferences';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getPreferences(): Observable<NotificationsPreferences> {
    return this.http.get<NotificationsPreferences>(
      `${this.apiUrl}/${this.authService.getUserId()}`
    );
  }

  updatePreferences(prefs: NotificationsPreferences): Observable<any> {
    return this.http.put(`${this.apiUrl}`, prefs);
  }
}
