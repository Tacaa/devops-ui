import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewAccommodationDTO } from 'src/app/shared/dto/ReviewAccommodationDTO';
import { AccommodationReview } from 'src/app/shared/models/accommodation-review.model';

export interface AccommodationReviews {
  accommodationId: number;
  reviews: AccommodationReview[];
  average: number;
}

export interface AccommodationReviewResponse {
  data: {
    id: string;
    review: number;
    accommodationId: number;
    date: string;
    reviewerId: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AccommodationRatingService {
  private apiUrl = 'http://localhost:8084/api/accommodation-review';

  constructor(private http: HttpClient) {}

  getReviewsByAccommodationId(
    accommodationId: number
  ): Observable<AccommodationReviews> {
    return this.http.get<AccommodationReviews>(
      `${this.apiUrl}/all/${accommodationId}`
    );
  }

  reviewAccommodation(reviewAccommodationDTO: ReviewAccommodationDTO) {
    return this.http.post<AccommodationReviewResponse>(
      `${this.apiUrl}`,
      reviewAccommodationDTO
    );
  }

  changeAccommodationReview(
    id: string,
    reviewAccommodationDTO: ReviewAccommodationDTO
  ) {
    return this.http.put<Response>(
      `${this.apiUrl}/${id}`,
      reviewAccommodationDTO
    );
  }

  deleteAccommodationReview(id: string) {
    return this.http.delete<Response>(`${this.apiUrl}/${id}`);
  }
}
