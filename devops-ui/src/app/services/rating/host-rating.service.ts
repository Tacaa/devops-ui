import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewHostDTO } from 'src/app/shared/dto/ReviewHostDTO';
import { HostReview } from 'src/app/shared/models/host-review.model';

export interface HostReviews {
  hostId: number;
  reviews: HostReview[];
  average: number;
}

export interface HostReviewResponse {
  data: {
    id: string;
    review: number;
    hostId: number;
    date: string;
    reviewerId: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class HostRatingService {
  private apiUrl = 'http://localhost:8084/api/host-review';

  constructor(private http: HttpClient) {}

  getReviewsByHostId(hostId: number): Observable<HostReviews> {
    return this.http.get<HostReviews>(`${this.apiUrl}/all/${hostId}`);
  }

  reviewHost(reviewHostDTO: ReviewHostDTO) {
    return this.http.post<HostReviewResponse>(`${this.apiUrl}`, reviewHostDTO);
  }
}
