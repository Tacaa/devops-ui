import { Component } from '@angular/core';

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.css'],
})
export class RightMenuComponent {
  userType: 'GUEST' | 'HOST' | null = null; // Default: not logged in

  constructor() {
    // Example: Fetch user type from localStorage or API
    //this.userType = localStorage.getItem('userType') as 'GUEST' | 'HOST' | null;
    this.userType = 'GUEST';
  }
}
