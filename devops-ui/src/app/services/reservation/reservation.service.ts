import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface ApiResponse {
  data: any[];
  message: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:8082/api/reservation';

  constructor(private http: HttpClient) {}

  getGuestReservations(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/guest/${id}`);
  }

  guestCancelReservation(id: number) {
    return this.http.delete<Response>(`${this.apiUrl}/${id}`);
  }
}
