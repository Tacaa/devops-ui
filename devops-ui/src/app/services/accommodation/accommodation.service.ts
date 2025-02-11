import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Accommodation } from 'src/app/shared/models/accommodation.model';
import { CreateAccommodationDTO } from 'src/app/shared/dto/createAccommodationDTO';

@Injectable({
  providedIn: 'root',
})
export class AccommodationService {
  private apiUrl = 'http://localhost:8082/api/accommodation';

  constructor(private http: HttpClient) {}

  getAllAccommodations(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>(this.apiUrl);
  }
  getAccommodationById(id: number): Observable<Accommodation> {
    return this.http.get<Accommodation>(`${this.apiUrl}/${id}`);
  }
  createAccommodation(
    accommodation: CreateAccommodationDTO
  ): Observable<{ message: string | null; data: Accommodation | null }> {
    return this.http.post<{
      message: string | null;
      data: Accommodation | null;
    }>(this.apiUrl, accommodation);
  }
}
