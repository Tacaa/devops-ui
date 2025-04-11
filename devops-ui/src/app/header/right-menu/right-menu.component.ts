import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CurrentUser, Role } from 'src/app/shared/models/user.model';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Notification } from 'src/app/shared/models/notification.model';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.css'],
})
export class RightMenuComponent implements OnInit, OnDestroy {
  userType: Role | undefined = undefined;
  currentUser: CurrentUser | null = null;
  private userSubscription!: Subscription;
  unreadCount: number = 0;
  private routerSubscription!: Subscription;

  // ✅ Expose Role enum for the template
  public Role = Role;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      this.userType = user?.role;
    });

    this.loadUnreadCount();

    // Listen for route changes
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loadUnreadCount(); // Reload unread notifications on route change
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  loadUnreadCount() {
    this.notificationService
      .getUserNotifications()
      .subscribe((notifications: Notification[]) => {
        this.unreadCount = notifications.filter((n) => !n.read).length;
      });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
