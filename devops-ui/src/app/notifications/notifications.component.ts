import { Component, OnInit } from '@angular/core';
import { Notification as AppNotification } from '../shared/models/notification.model';
import { NotificationService } from '../services/notification/notification.service';
import { NotificationsPreferences } from '../shared/models/notification-preferences.model';
import { NotificationPreferenceService } from '../services/notification/notification-preference.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  notifications: AppNotification[] = [];
  preferences: NotificationsPreferences | null = null;

  constructor(
    private notificationService: NotificationService,
    private preferenceService: NotificationPreferenceService
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
    this.loadPreferences();
  }

  loadNotifications() {
    this.notificationService.getUserNotifications().subscribe((data) => {
      this.notifications = data;

      const unread = data.filter((n) => !n.read);
      if (unread.length > 0) {
        const updated = unread.map((n) => ({ ...n, read: true }));
        this.notificationService.setToRead(updated).subscribe();
      }
    });
  }

  loadPreferences() {
    this.preferenceService.getPreferences().subscribe((pref) => {
      this.preferences = pref;
    });
  }

  submitPreferences() {
    if (this.preferences) {
      this.preferenceService.updatePreferences(this.preferences).subscribe({
        next: () => {
          alert('Preferences updated!');
          window.location.reload();
        },
        error: (err) => console.error('Update failed', err),
      });
    }
  }
}
