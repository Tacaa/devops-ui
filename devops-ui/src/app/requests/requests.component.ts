import { Component, OnInit } from '@angular/core';
import { AccommodationService } from '../services/mock/accommodation.service';
import { Reservation, Status } from '../shared/models/reservation.model';
import { ReservationService } from '../services/reservation/reservation.service';
import { UserService } from '../services/user/user.service';
import { User } from '../services/mock/user.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
})
export class RequestsComponent implements OnInit {
  requests: Reservation[] = [];
  respondedRequests: Reservation[] = [];
  loading = false;
  users: User[] = [];
  error: string | null = null;
  actionMessage: string | null = null;
  hostId: number | null = 16;

  constructor(
    private accommodationService: AccommodationService,
    private userService: UserService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    if (this.hostId) {
      this.loadPendingReservations();
    } else {
      this.error = 'Host ID not found';
      this.loading = false;
    }

    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  getUserUsername(id: number) {
    return this.users.find((user) => user.id === id)?.username;
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

  approveRequest(request: Reservation): void {
    request.status = Status.ACCEPTED;
    this.respondedRequests.push(request);
    this.requests = this.requests.filter((r) => r.id !== request.id);
  }

  declineRequest(request: Reservation): void {
    request.status = Status.DECLINED;
    this.respondedRequests.push(request);
    this.requests = this.requests.filter((r) => r.id !== request.id);
  }

  submitAllRequests(): void {
    if (this.respondedRequests.length === 0) {
      this.actionMessage = 'No requests to submit.';
      alert(this.actionMessage);
      return;
    }

    this.reservationService
      .hostSaveMannuallyApproved(this.respondedRequests)
      .subscribe({
        next: () => {
          this.actionMessage = 'Requests submitted successfully!';
          this.respondedRequests = []; // Clear the array after submission
        },
        error: (error) => {
          this.error = 'Error submitting requests: ' + error.message;
        },
      });
  }
}
