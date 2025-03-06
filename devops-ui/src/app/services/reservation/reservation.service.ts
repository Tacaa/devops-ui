import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateReservationDTO } from 'src/app/shared/dto/CreateReservationDTO';
import { Reservation } from 'src/app/shared/models/reservation.model';

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

  getHostPendingReservations(id: number): Observable<Response> {
    return this.http.get<Response>(
      `${this.apiUrl}/all-host-pending-accommodation/${id}`
    );
  }

  hostAcceptReservation(id: number) {
    return this.http.post<Response>(`${this.apiUrl}/accept/${id}`, null);
  }

  hostDeclineReservation(id: number) {
    return this.http.post<Response>(`${this.apiUrl}/decline/${id}`, null);
  }

  guestCancelReservation(id: number) {
    return this.http.delete<Response>(`${this.apiUrl}/${id}`);
  }

  guestCreateReservation(
    createReservationDTO: CreateReservationDTO
  ): Observable<
    HttpResponse<{ message: string | null; data: Reservation | null }>
  > {
    return this.http.post<{
      message: string | null;
      data: Reservation | null;
    }>(`${this.apiUrl}/`, createReservationDTO, { observe: 'response' });
  }
}
