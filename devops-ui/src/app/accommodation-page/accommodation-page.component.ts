import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationService } from '../services/accommodation/accommodation.service';

import { first, map, Observable } from 'rxjs';
import { Accommodation } from '../shared/models/accommodation.model';
import { AccommodationRatingService } from '../services/rating/accommodation-rating.service';
import { UserRatingService } from '../services/rating/user-rating.service';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private accommodationService: AccommodationService,
    private accommodationRatingService: AccommodationRatingService,
    private hostRatingService: UserRatingService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        const accommodationId = params['id'];

        // Fetch accommodation details
        this.accommodation$ =
          this.accommodationService.getAccommodationById(accommodationId);

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
              this.hostId = hostId;
              // Only fetch host ratings after we have the hostId
              this.hostRatingService
                .getReviewsByHostId(hostId) // Use hostId directly here
                .subscribe((data) => {
                  this.hostRatingsData = data;
                });
            }
          });
      }
    });
  }
}
