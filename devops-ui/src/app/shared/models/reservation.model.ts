import { Accommodation } from './accommodation.model';

export enum Status {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

export interface Reservation {
  id: number;
  accommodation: Accommodation;
  startDate: string;
  endDate: string;
  numGuests: number;
  userId: number;
  status: Status;
  canceled: boolean;
  deleted: boolean;
}
