export interface CreateReservationDTO {
  accommodationId: number;
  startDate: string;
  endDate: string;
  numGuests: number;
  userId: number;
}
