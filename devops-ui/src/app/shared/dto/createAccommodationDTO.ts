import {
  Address,
  Benefits,
  PriceType,
  RequestApproval,
} from '../models/accommodation.model';

export interface CreateAccommodationDTO {
  name: string;
  address: Address;
  benefits: Benefits[];
  photos: string[];
  minGuests: number;
  maxGuests: number;
  priceType: PriceType;
  requestApproval: RequestApproval;
  hostId: number;
}
