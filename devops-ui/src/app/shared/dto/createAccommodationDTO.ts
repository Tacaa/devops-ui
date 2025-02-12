import {
  Benefits,
  PriceType,
  RequestApproval,
} from '../models/accommodation.model';
import { Address } from '../models/address.model';

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
