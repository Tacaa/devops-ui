import { Component, OnInit } from '@angular/core';
import { AccommodationService } from '../services/accommodation.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
})
export class RequestsComponent implements OnInit {
  requests: any[] = [];
  reservationHistory: any[] = [];

  constructor(private accommodationService: AccommodationService) {}

  ngOnInit(): void {
    this.requests = [
      {
        user: 'John Doe',
        accommodation: { name: 'Hotel Sunrise' },
        guests: 2,
        from: new Date(2025, 1, 10),
        to: new Date(2025, 1, 15),
      },
      {
        user: 'Alice Smith',
        accommodation: { name: 'Sea Breeze Resort' },
        guests: 4,
        from: new Date(2025, 2, 5),
        to: new Date(2025, 2, 10),
      },
      {
        user: 'Bob Johnson',
        accommodation: { name: 'Mountain Retreat' },
        guests: 1,
        from: new Date(2025, 3, 20),
        to: new Date(2025, 3, 25),
      },
      {
        user: 'Emma Brown',
        accommodation: { name: 'Urban Stay' },
        guests: 3,
        from: new Date(2025, 4, 12),
        to: new Date(2025, 4, 18),
      },
      {
        user: 'Michael Lee',
        accommodation: { name: 'Countryside Inn' },
        guests: 2,
        from: new Date(2025, 5, 8),
        to: new Date(2025, 5, 12),
      },
    ];

    this.reservationHistory = [
      {
        user: 'David Green',
        accommodation: { name: 'Lake View Hotel' },
        guests: 3,
        from: new Date(2024, 11, 5),
        to: new Date(2024, 11, 10),
        status: 'Accepted',
      },
      {
        user: 'Sophia White',
        accommodation: { name: 'Mountain Lodge' },
        guests: 2,
        from: new Date(2024, 10, 15),
        to: new Date(2024, 10, 20),
        status: 'Declined',
      },
      {
        user: 'James Black',
        accommodation: { name: 'City Center Apartment' },
        guests: 4,
        from: new Date(2024, 9, 1),
        to: new Date(2024, 9, 5),
        status: 'Accepted',
      },
    ];
  }

  approveRequest(request: any): void {
    this.reservationHistory.push({ ...request, status: 'Accepted' });
    this.requests = this.requests.filter((r) => r !== request);
  }

  declineRequest(request: any): void {
    this.reservationHistory.push({ ...request, status: 'Declined' });
    this.requests = this.requests.filter((r) => r !== request);
  }
}
