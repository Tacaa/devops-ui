import { Injectable } from '@angular/core';
import { Notification } from '../models/notification.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notifications: Notification[] = [
    {
      type: 'Reservation request created',
      message: 'John Doe created a reservation request',
    },
    {
      type: 'Reservation Cancelled',
      message: 'John Doe cancelled reservation',
    },
    { type: 'Personal Ratings', message: 'John Doe rated you with 5 stars' },
    {
      type: 'Accommodation Ratings',
      message: 'John Doe rated Cozy Cabin with 4 stars',
    },
    {
      type: 'Reservation response by host',
      message: 'Host approved your reservation request for Cozy Cabin',
    },
  ];

  private filteredNotifications = new BehaviorSubject<Notification[]>(
    this.notifications
  );
  notifications$ = this.filteredNotifications.asObservable();

  filterNotifications(selectedTypes: string[]) {
    const filtered = this.notifications.filter((n) =>
      selectedTypes.includes(n.type)
    );
    this.filteredNotifications.next(filtered);
  }
}
