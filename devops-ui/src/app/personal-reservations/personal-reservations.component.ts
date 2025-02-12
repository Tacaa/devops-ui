import { Component, OnInit } from '@angular/core';
import { AccommodationService } from '../services/mock/accommodation.service';

@Component({
  selector: 'app-personal-reservations',
  templateUrl: './personal-reservations.component.html',
  styleUrls: ['./personal-reservations.component.css'],
})
export class PersonalReservationsComponent implements OnInit {
  reservations: any[] = [];

  constructor(private accommodationService: AccommodationService) {}

  ngOnInit(): void {
    this.reservations = [
      {
        accommodation: { name: 'Hotel Sunrise' },
        from: new Date(2025, 1, 10),
        to: new Date(2025, 1, 15),
        status: 'Accepted',
      },
      {
        accommodation: { name: 'Sea Breeze Resort' },
        from: new Date(2025, 2, 5),
        to: new Date(2025, 2, 10),
        status: 'Pending',
      },
      {
        accommodation: { name: 'Mountain Retreat' },
        from: new Date(2025, 3, 20),
        to: new Date(2025, 3, 25),
        status: 'Declined',
      },
      {
        accommodation: { name: 'Urban Stay' },
        from: new Date(2025, 4, 12),
        to: new Date(2025, 4, 18),
        status: 'Accepted',
      },
      {
        accommodation: { name: 'Countryside Inn' },
        from: new Date(2025, 5, 8),
        to: new Date(2025, 5, 12),
        status: 'Pending',
      },
    ];
  }

  cancelReservation(reservation: any): void {
    this.reservations = this.reservations.filter((r) => r !== reservation);
  }
}
