import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationService } from '../services/accommodation/accommodation.service';

import { first, map, Observable } from 'rxjs';
import { Accommodation } from '../shared/models/accommodation.model';
import { AccommodationRatingService } from '../services/rating/accommodation-rating.service';
import { HostRatingService } from '../services/rating/host-rating.service';
import { ReviewHostDTO } from '../shared/dto/ReviewHostDTO';
import { ReviewAccommodationDTO } from '../shared/dto/ReviewAccommodationDTO';
import { MatDialog } from '@angular/material/dialog';
import { HostReviewDialogComponent } from '../dialogs/host-review-dialog/host-review-dialog.component';
import { AccommodationReviewDialogComponent } from '../dialogs/accommodation-review-dialog/accommodation-review-dialog.component';

@Component({
  selector: 'app-accommodation-page',
  templateUrl: './accommodation-page.component.html',
  styleUrls: ['./accommodation-page.component.css'],
})
export class AccommodationPageComponent implements OnInit {
  accommodation$: Observable<Accommodation> | undefined;
  accommodationRatingsData: any; // Holds the accomm. rating data
  hostRatingsData: any; // Holds the host rating data
  hostId: number = 0;
  accommodationId: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private accommodationService: AccommodationService,
    private accommodationRatingService: AccommodationRatingService,
    private hostRatingService: HostRatingService,
    private dialog: MatDialog
  ) {}

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
