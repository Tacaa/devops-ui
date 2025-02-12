import { Component } from '@angular/core';
import { NotificationService } from '../services/mock/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent {
  hostOptions = [
    'Reservation request created',
    'Reservation Cancelled',
    'Personal Ratings',
    'Accommodation Ratings',
  ];
  guestOptions = ['Reservation response by host'];

  selectedTypes: string[] = [...this.hostOptions, ...this.guestOptions];
  notifications$ = this.notificationService.notifications$;

  constructor(private notificationService: NotificationService) {}

  updateFilter(type: string, event: any) {
    if (event.target.checked) {
      this.selectedTypes.push(type);
    } else {
      this.selectedTypes = this.selectedTypes.filter((t) => t !== type);
    }
    this.notificationService.filterNotifications(this.selectedTypes);
  }
}
