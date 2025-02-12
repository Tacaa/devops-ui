import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationService } from '../services/accommodation/accommodation.service';

import { Observable } from 'rxjs';
import { Accommodation } from '../shared/models/accommodation.model';
import { AccommodationRatingService } from '../services/rating/accommodation-rating.service';

@Component({
  selector: 'app-accommodation-page',
  templateUrl: './accommodation-page.component.html',
  styleUrls: ['./accommodation-page.component.css'],
})
export class AccommodationPageComponent implements OnInit {
  accommodation$: Observable<Accommodation> | undefined;
  ratingsData: any; // Holds the rating data

  constructor(
    private activatedRoute: ActivatedRoute,
    private accommodationService: AccommodationService,
    private ratingService: AccommodationRatingService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        const accommodationId = params['id'];

        // Fetch accommodation details
        this.accommodation$ =
          this.accommodationService.getAccommodationById(accommodationId);

        // Fetch accommodation ratings
        this.ratingService
          .getReviewsByAccommodationId(accommodationId)
          .subscribe((data) => {
            this.ratingsData = data;
          });
      }
    });
  }
}
