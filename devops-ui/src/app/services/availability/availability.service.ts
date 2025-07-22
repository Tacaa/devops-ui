import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Availability } from 'src/app/shared/models/availability.model';

@Injectable({
  providedIn: 'root',
})
export class AvailabilityService {
  private apiUrl = 'http://localhost/api/availability';

  constructor(private http: HttpClient) {}

  getAccommodationAvailabilities(
    accommodationId: number
  ): Observable<Availability[]> {
    return this.http.get<Availability[]>(`${this.apiUrl}/${accommodationId}`);
  }

  addAvailability(availability: Availability): Observable<Availability> {
    return this.http.post<Availability>(`${this.apiUrl}`, availability);
  }

  updateAvailability(
    id: number,
    availability: Availability
  ): Observable<Availability> {
    return this.http.put<Availability>(`${this.apiUrl}/${id}`, availability);
  }
}
