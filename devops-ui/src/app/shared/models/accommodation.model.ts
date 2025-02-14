import { Address } from './address.model';

export enum Benefits {
  WIFI = 'WIFI',
  FREE_PARKING = 'FREE_PARKING',
  AIR_CONDITIONING = 'AIR_CONDITIONING',
  SWIMMING_POOL = 'SWIMMING_POOL',
  PET_FRIENDLY = 'PET_FRIENDLY',
  BREAKFAST_INCLUDED = 'BREAKFAST_INCLUDED',
  GYM_ACCESS = 'GYM_ACCESS',
  SPA_SERVICES = 'SPA_SERVICES',
  WHEELCHAIR_ACCESSIBLE = 'WHEELCHAIR_ACCESSIBLE',
  BALCONY_OR_TERRACE = 'BALCONY_OR_TERRACE',
  OCEAN_VIEW = 'OCEAN_VIEW',
  GARDEN_VIEW = 'GARDEN_VIEW',
  PRIVATE_ENTRANCE = 'PRIVATE_ENTRANCE',
  FULLY_EQUIPPED_KITCHEN = 'FULLY_EQUIPPED_KITCHEN',
  WASHING_MACHINE = 'WASHING_MACHINE',
  DRYER = 'DRYER',
  SMART_TV = 'SMART_TV',
  HEATING = 'HEATING',
  FIREPLACE = 'FIREPLACE',
  BBQ_GRILL = 'BBQ_GRILL',
}

export enum PriceType {
  BY_PERSON = 'BY_PERSON',
  BY_ACCOMMODATION = 'BY_ACCOMMODATION',
}

export enum RequestApproval {
  AUTOMATIC = 'AUTOMATIC',
  MANUALLY = 'MANUALLY',
}

export interface Accommodation {
  id: number;
  name: string;
  address: Address;
  benefits: Benefits[];
  photos: string[];
  minGuests: number;
  maxGuests: number;
  priceType: PriceType;
  requestApproval: RequestApproval;
  hostId: number;
  unitPrice?: number;
  toalPrice?: number;
}
