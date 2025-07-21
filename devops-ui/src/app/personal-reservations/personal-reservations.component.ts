import { Component, OnInit } from '@angular/core';
import { AccommodationService } from '../services/mock/accommodation.service';
import { Reservation } from '../shared/models/reservation.model';
import { ReservationService } from '../services/reservation/reservation.service';
import { AuthService } from '../services/auth/auth.service';

interface ApiResponse {
  data: Reservation[];
  message: string | null;
}

@Component({
  selector: 'app-personal-reservations',
  templateUrl: './personal-reservations.component.html',
  styleUrls: ['./personal-reservations.component.css'],
})
export class PersonalReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  userId: number | null = this.authService.getUserId();

  private loggedInUserId = this.userId; // Replace with actual user ID or authentication service

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService
      .getGuestReservations(this.loggedInUserId as number)
      .subscribe({
        next: (response: ApiResponse) => {
          this.reservations = response.data;
        },
        error: (error) => {
          console.error('Error fetching reservations:', error);
        },
      });
  }

  cancelReservation(reservation: Reservation): void {
    this.reservationService.guestCancelReservation(reservation.id).subscribe({
      next: () => {
        this.loadReservations();
      },
      error: (error) => {
        console.error('Error canceling reservation:', error);
        alert('Error: ' + error.error.message);
      },
    });
  }

  // Helper method to format status for display
  formatStatus(status: string): string {
    return status.charAt(0) + status.slice(1).toLowerCase();
  }
}
