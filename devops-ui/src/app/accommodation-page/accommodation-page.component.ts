import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationService } from '../services/accommodation/accommodation.service';

import { first, map, Observable } from 'rxjs';
import { Accommodation, PriceType } from '../shared/models/accommodation.model';
import { AccommodationRatingService } from '../services/rating/accommodation-rating.service';
import { HostRatingService } from '../services/rating/host-rating.service';
import { ReviewHostDTO } from '../shared/dto/ReviewHostDTO';
import { ReviewAccommodationDTO } from '../shared/dto/ReviewAccommodationDTO';
import { MatDialog } from '@angular/material/dialog';
import { HostReviewDialogComponent } from '../dialogs/host-review-dialog/host-review-dialog.component';
import { AccommodationReviewDialogComponent } from '../dialogs/accommodation-review-dialog/accommodation-review-dialog.component';
import { CreateReservationDTO } from '../shared/dto/CreateReservationDTO';
import { ReservationService } from '../services/reservation/reservation.service';
import { AvailabilityService } from '../services/availability/availability.service';
import { Availability } from '../shared/models/availability.model';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-accommodation-page',
  templateUrl: './accommodation-page.component.html',
  styleUrls: ['./accommodation-page.component.css'],
})
export class AccommodationPageComponent implements OnInit {
  accommodation$: Observable<Accommodation> | undefined;
  accommodationRatingsData: any; // Holds the accommodation rating data
  hostRatingsData: any; // Holds the host rating data
  hostId: number = 0; //Will load actual data onInit
  accommodationId: number = 0; //Will load actual data onInit
  createReservationDto: CreateReservationDTO | undefined;
  availabilities: Availability[] = [];
  totalPrice: number = 0;
  userRole: string | null = this.authService.getUserRole();
  userId: number | null = this.authService.getUserId();

  reservationData = {
    numGuest: 2,
    startDate: '2025-08-27',
    endDate: '2025-08-30',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private accommodationService: AccommodationService,
    private accommodationRatingService: AccommodationRatingService,
    private hostRatingService: HostRatingService,
    private reservationService: ReservationService,
    private dialog: MatDialog,
    private availabilityService: AvailabilityService,
    private authService: AuthService
  ) {}

  createReservation() {
    const reservationDTO: CreateReservationDTO = {
      accommodationId: this.accommodationId,
      startDate: this.reservationData.startDate,
      endDate: this.reservationData.endDate,
      numGuests: this.reservationData.numGuest,
      userId: this.authService.getUserId(),
    };

    // Call the service method
    this.reservationService.guestCreateReservation(reservationDTO).subscribe({
      next: (response) => {
        console.log('Reservation created successfully:', response);

        if (response.status === 201) {
          alert('Reservation created successfully!');
        }
      },
      error: (error) => {
        console.error('Error creating reservation:', error);
        alert(`Failed to create reservation: ${error.error.message}`);
      },
    });
  }

  openHostReviewDialog(): void {
    const dialogRef = this.dialog.open(HostReviewDialogComponent, {
      width: '300px',
      data: { hostId: this.hostId },
    });

    dialogRef.afterClosed().subscribe((review) => {
      if (review !== undefined) {
        this.hostRatingService.reviewHost(review).subscribe({
          next: () => {
            console.log('Host review submitted successfully');
            window.location.reload();
          },
          error: (error) => {
            console.error('Error submitting host review:', error);
            alert(error.error.message);
          },
        });
      }
    });
  }

  openAccommodationReviewDialog(): void {
    const dialogRef = this.dialog.open(AccommodationReviewDialogComponent, {
      width: '300px',
      data: { accommodationId: this.accommodationId },
    });

    dialogRef.afterClosed().subscribe((review) => {
      if (review !== undefined) {
        this.accommodationRatingService.reviewAccommodation(review).subscribe({
          next: () => {
            console.log('Accommodation review submitted successfully');
            window.location.reload();
          },
          error: (error) => {
            console.error('Error submitting accommodation review:', error);
            alert(error.error.message);
          },
        });
      }
    });
  }

  calculateTotalPrice(): void {
    if (
      !this.reservationData.startDate ||
      !this.reservationData.endDate ||
      !this.reservationData.numGuest ||
      this.availabilities.length === 0
    ) {
      this.totalPrice = 0;
      return;
    }

    const startDate = new Date(this.reservationData.startDate);
    const endDate = new Date(this.reservationData.endDate);
    let totalPrice = 0;

    // Get the accommodation to check price type
    if (this.accommodation$) {
      this.accommodation$.pipe(first()).subscribe((accommodation) => {
        if (accommodation) {
          this.availabilities.forEach((availability) => {
            const availabilityStart = new Date(availability.startDate);
            const availabilityEnd = new Date(availability.endDate);

            // Check if selected dates overlap with availability
            if (endDate >= availabilityStart && startDate <= availabilityEnd) {
              const overlapStart =
                startDate > availabilityStart ? startDate : availabilityStart;
              const overlapEnd =
                endDate < availabilityEnd ? endDate : availabilityEnd;

              // Calculate nights
              const nights = Math.ceil(
                (overlapEnd.getTime() - overlapStart.getTime()) /
                  (1000 * 60 * 60 * 24)
              );

              if (accommodation.priceType === PriceType.BY_PERSON) {
                totalPrice +=
                  nights * availability.price * this.reservationData.numGuest;
              } else {
                totalPrice += nights * availability.price;
              }
            }
          });

          this.totalPrice = totalPrice;
        }
      });
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        const accommodationId = params['id'];

        // Fetch accommodation details
        this.accommodation$ =
          this.accommodationService.getAccommodationById(accommodationId);

        this.accommodationId = accommodationId;

        // Fetch accommodation ratings
        this.accommodationRatingService
          .getReviewsByAccommodationId(accommodationId)
          .subscribe((data) => {
            this.accommodationRatingsData = data;
          });

        this.availabilityService
          .getAccommodationAvailabilities(accommodationId)
          .subscribe({
            next: (data) => {
              this.availabilities = data;
              this.calculateTotalPrice();
            },
            error: (err) => {
              console.error('Error fetching availabilities:', err);
            },
          });

        // Get hostId first, then fetch host ratings
        this.accommodation$
          .pipe(
            first(),
            map((accommodation) => accommodation?.hostId)
          )
          .subscribe((hostId) => {
            if (hostId) {
              // Only fetch host ratings after we have the hostId
              this.hostRatingService
                .getReviewsByHostId(hostId) // Use hostId directly here
                .subscribe((data) => {
                  this.hostRatingsData = data;
                });
              this.hostId = hostId;
            }
          });
      }
    });
  }
}
