import { Accommodation } from './accommodation.model';

export interface Reservation {
  id: number;
  accommodation: Accommodation;
  startDate: string;
  endDate: string;
  numGuests: number;
  userId: number;
  status: string;
  canceled: boolean;
  deleted: boolean;
}
