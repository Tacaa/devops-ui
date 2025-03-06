import { Component, OnInit } from '@angular/core';
import { AccommodationService } from '../services/mock/accommodation.service';
import { Reservation } from '../shared/models/reservation.model';
import { ReservationService } from '../services/reservation/reservation.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
})
export class RequestsComponent implements OnInit {
  requests: Reservation[] = [];
  loading = false;
  actionInProgress = false;

  error: string | null = null;
  actionMessage: string | null = null;
  hostId: number | null = 16;

  constructor(
    private accommodationService: AccommodationService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    // Get host ID from authentication service or route params
    // This example assumes you have it in the auth service

    if (this.hostId) {
      this.loadPendingReservations();
    } else {
      this.error = 'Host ID not found';
      this.loading = false;
    }
  }

  loadPendingReservations(): void {
    if (!this.hostId) return;

    this.reservationService.getHostPendingReservations(this.hostId).subscribe({
      next: (response: any) => {
        this.requests = response;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load pending reservations: ' + err.message;
        this.loading = false;
      },
    });
  }

  approveRequest(id: number): void {
    this.reservationService.hostAcceptReservation(id).subscribe({
      next: () => window.location.reload(),
      error: (error) => console.error('Error approving request:', error),
    });
  }

  declineRequest(id: number): void {
    this.reservationService.hostDeclineReservation(id).subscribe({
      next: () => window.location.reload(),
      error: (error) => alert(error),
    });
  }
}
