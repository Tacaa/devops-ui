import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccommodationReview } from 'src/app/shared/models/accommodation-review.model';

export interface AccommodationReviews {
  accommodationId: number;
  reviews: AccommodationReview[];
  average: number;
}

@Injectable({
  providedIn: 'root',
})
export class AccommodationRatingService {
  private apiUrl = 'http://localhost:8084/api/accommodation-review/';

  constructor(private http: HttpClient) {}

  getReviewsByAccommodationId(
    accommodationId: number
  ): Observable<AccommodationReviews> {
    return this.http.get<AccommodationReviews>(
      `${this.apiUrl}all/${accommodationId}`
    );
  }
}
