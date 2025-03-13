export interface Availability {
  id: number;
  startDate: string;
  endDate: string;
  available: boolean;
  deleted: boolean;
  price: number;
  accommodationId: number;
}
