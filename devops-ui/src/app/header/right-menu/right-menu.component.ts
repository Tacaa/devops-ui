import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.css'],
})
export class RightMenuComponent {
  userType: 'GUEST' | 'HOST' | null = null; // Default: not logged in

  constructor(private authService: AuthService) {
    // Example: Fetch user type from localStorage or API
    //this.userType = localStorage.getItem('userType') as 'GUEST' | 'HOST' | null;
    this.userType = 'HOST';
  }

  logout() {
    this.authService.logout();
  }
}
