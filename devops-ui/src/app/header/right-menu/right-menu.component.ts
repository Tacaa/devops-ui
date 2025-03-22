import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CurrentUser, Role } from 'src/app/shared/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.css'],
})
export class RightMenuComponent implements OnInit, OnDestroy {
  userType: Role | undefined = undefined;
  currentUser: CurrentUser | null = null;
  private userSubscription!: Subscription;

  // ✅ Expose Role enum for the template
  public Role = Role;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      this.userType = user?.role;
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
