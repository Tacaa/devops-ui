import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationService } from '../services/accommodation/accommodation.service';
import { AvailabilityService } from '../services/availability/availability.service';
import { Accommodation } from '../shared/models/accommodation.model';
import { Observable } from 'rxjs';
import { Availability } from '../shared/models/availability.model';

@Component({
  selector: 'app-accommodation-availability',
  templateUrl: './accommodation-availability.component.html',
  styleUrls: ['./accommodation-availability.component.css'],
})
export class AccommodationAvailabilityComponent implements OnInit {
  accommodationId: number = 0;
  accommodation$: Observable<Accommodation> | undefined;
  availabilities: Availability[] = [];
  showForm = false;

  newAvailability: Availability = {
    id: 0,
    startDate: '',
    endDate: '',
    available: true,
    deleted: false,
    price: 0,
    accommodationId: this.accommodationId,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private accommodationService: AccommodationService,
    private availabilityService: AvailabilityService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        const accommodationId = params['id'];
        this.accommodationId = accommodationId;

        // Fetch accommodation details
        this.accommodation$ =
          this.accommodationService.getAccommodationById(accommodationId);

        this.loadAvailabilities();
      }
    });
  }

  loadAvailabilities(): void {
    this.availabilityService
      .getAccommodationAvailabilities(this.accommodationId)
      .subscribe({
        next: (data) => {
          this.availabilities = data;
        },
        error: (err) => {
          console.error('Error fetching availabilities:', err);
        },
      });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.newAvailability.accommodationId = this.accommodationId;
  }

  addNewAvailability(): void {
    this.availabilityService.addAvailability(this.newAvailability).subscribe({
      next: (addedAvailability) => {
        this.availabilities.push(addedAvailability);
        this.showForm = false;
        this.resetForm();
        window.location.reload();
      },
      error: (error) => {
        console.error('Error adding availability:', error);
        alert(error.error.message);
      },
    });
  }

  updateAvailability(availability: Availability): void {
    this.availabilityService
      .updateAvailability(availability.id, availability)
      .subscribe({
        next: () => {
          console.log('Availability updated:', availability);
        },
        error: (error) => {
          console.error('Error updating availability:', error);
          alert(error.error.message);
        },
      });
  }

  resetForm(): void {
    this.newAvailability = {
      id: 0,
      startDate: '',
      endDate: '',
      available: true,
      deleted: false,
      price: 0,
      accommodationId: this.accommodationId,
    };
  }
}
