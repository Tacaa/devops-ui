import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HostReview } from 'src/app/shared/models/host-review.model';

export interface HostReviews {
  hostId: number;
  reviews: HostReview[];
  average: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserRatingService {
  private apiUrl = 'http://localhost:8084/api/host-review/';

  constructor(private http: HttpClient) {}

  getReviewsByHostId(hostId: number): Observable<HostReviews> {
    return this.http.get<HostReviews>(`${this.apiUrl}all/${hostId}`);
  }
}
