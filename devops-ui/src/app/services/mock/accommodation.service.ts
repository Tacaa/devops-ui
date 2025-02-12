import { Injectable } from '@angular/core';

export enum Benefits {
  WIFI = 'WIFI',
  FREE_PARKING = 'FREE_PARKING',
  AIR_CONDITIONING = 'AIR_CONDITIONING',
  SWIMMING_POOL = 'SWIMMING_POOL',
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
  address: string;
  benefits: Benefits[];
  photo: string[];
  minGuests: number;
  maxGuests: number;
  priceType: PriceType;
  requestApproval: RequestApproval;
  hostId: number;
}

@Injectable({
  providedIn: 'root',
})
export class AccommodationService {
  getAccomodationById(id: number): Accommodation {
    return this.getAll().find((accommodation) => accommodation.id == id)!;
  }

  getAll(): Accommodation[] {
    return [
      {
        id: 1,
        name: 'Sunny Beach House',
        address: '123 Ocean Drive, Miami',
        benefits: [
          Benefits.WIFI,
          Benefits.FREE_PARKING,
          Benefits.AIR_CONDITIONING,
        ],
        photo: [
          '../../assets/images/accommodation1.jpg',
          '../../assets/images/accommodation2.jpg',
          '../../assets/images/accommodation3.jpg',
        ],
        minGuests: 2,
        maxGuests: 6,
        priceType: PriceType.BY_ACCOMMODATION,
        requestApproval: RequestApproval.AUTOMATIC,
        hostId: 101,
      },
      {
        id: 2,
        name: 'Mountain Cabin Retreat',
        address: '456 Pine Road, Aspen',
        benefits: [
          Benefits.WIFI,
          Benefits.SWIMMING_POOL,
          Benefits.FREE_PARKING,
        ],
        photo: [
          '../../assets/images/accommodation1.jpg',
          '../../assets/images/accommodation2.jpg',
          '../../assets/images/accommodation3.jpg',
        ],
        minGuests: 4,
        maxGuests: 8,
        priceType: PriceType.BY_PERSON,
        requestApproval: RequestApproval.MANUALLY,
        hostId: 102,
      },
      {
        id: 3,
        name: 'Downtown Loft',
        address: '789 City Center, New York',
        benefits: [Benefits.WIFI, Benefits.AIR_CONDITIONING],
        photo: [
          '../../assets/images/accommodation1.jpg',
          '../../assets/images/accommodation2.jpg',
          '../../assets/images/accommodation3.jpg',
        ],
        minGuests: 1,
        maxGuests: 3,
        priceType: PriceType.BY_ACCOMMODATION,
        requestApproval: RequestApproval.AUTOMATIC,
        hostId: 103,
      },
      {
        id: 4,
        name: 'Cozy Lake House',
        address: '22 Lakeside Ave, Seattle',
        benefits: [
          Benefits.WIFI,
          Benefits.FREE_PARKING,
          Benefits.AIR_CONDITIONING,
        ],
        photo: [
          '../../assets/images/accommodation1.jpg',
          '../../assets/images/accommodation2.jpg',
          '../../assets/images/accommodation3.jpg',
        ],
        minGuests: 2,
        maxGuests: 5,
        priceType: PriceType.BY_ACCOMMODATION,
        requestApproval: RequestApproval.MANUALLY,
        hostId: 104,
      },
      {
        id: 5,
        name: 'Rustic Country Home',
        address: '67 Maple Road, Vermont',
        benefits: [Benefits.WIFI, Benefits.FREE_PARKING],
        photo: [
          '../../assets/images/accommodation1.jpg',
          '../../assets/images/accommodation2.jpg',
          '../../assets/images/accommodation3.jpg',
        ],
        minGuests: 4,
        maxGuests: 10,
        priceType: PriceType.BY_PERSON,
        requestApproval: RequestApproval.AUTOMATIC,
        hostId: 105,
      },
      {
        id: 6,
        name: 'Luxury Penthouse',
        address: '88 Skyline Blvd, Los Angeles',
        benefits: [
          Benefits.WIFI,
          Benefits.AIR_CONDITIONING,
          Benefits.SWIMMING_POOL,
        ],
        photo: [
          '../../assets/images/accommodation1.jpg',
          '../../assets/images/accommodation2.jpg',
          '../../assets/images/accommodation3.jpg',
        ],
        minGuests: 1,
        maxGuests: 4,
        priceType: PriceType.BY_ACCOMMODATION,
        requestApproval: RequestApproval.MANUALLY,
        hostId: 106,
      },
      {
        id: 7,
        name: 'Seaside Bungalow',
        address: '99 Beachfront Lane, Malibu',
        benefits: [
          Benefits.WIFI,
          Benefits.FREE_PARKING,
          Benefits.SWIMMING_POOL,
        ],
        photo: [
          '../../assets/images/accommodation1.jpg',
          '../../assets/images/accommodation2.jpg',
          '../../assets/images/accommodation3.jpg',
        ],
        minGuests: 2,
        maxGuests: 6,
        priceType: PriceType.BY_PERSON,
        requestApproval: RequestApproval.AUTOMATIC,
        hostId: 107,
      },
      {
        id: 8,
        name: 'Modern Apartment',
        address: '200 High Street, Boston',
        benefits: [Benefits.WIFI, Benefits.AIR_CONDITIONING],
        photo: [
          '../../assets/images/accommodation1.jpg',
          '../../assets/images/accommodation2.jpg',
          '../../assets/images/accommodation3.jpg',
        ],
        minGuests: 1,
        maxGuests: 2,
        priceType: PriceType.BY_ACCOMMODATION,
        requestApproval: RequestApproval.MANUALLY,
        hostId: 108,
      },
      {
        id: 9,
        name: 'Charming Cottage',
        address: '14 Willow Path, Asheville',
        benefits: [Benefits.WIFI, Benefits.FREE_PARKING],
        photo: [
          '../../assets/images/accommodation1.jpg',
          '../../assets/images/accommodation2.jpg',
          '../../assets/images/accommodation3.jpg',
        ],
        minGuests: 2,
        maxGuests: 4,
        priceType: PriceType.BY_PERSON,
        requestApproval: RequestApproval.AUTOMATIC,
        hostId: 109,
      },
      {
        id: 10,
        name: 'Hilltop Villa',
        address: '34 Sunset Drive, Napa Valley',
        benefits: [
          Benefits.WIFI,
          Benefits.SWIMMING_POOL,
          Benefits.AIR_CONDITIONING,
        ],
        photo: [
          '../../assets/images/accommodation1.jpg',
          '../../assets/images/accommodation2.jpg',
          '../../assets/images/accommodation3.jpg',
        ],
        minGuests: 3,
        maxGuests: 7,
        priceType: PriceType.BY_ACCOMMODATION,
        requestApproval: RequestApproval.MANUALLY,
        hostId: 110,
      },
      {
        id: 11,
        name: 'Forest Retreat',
        address: '77 Pinewood Trail, Yellowstone',
        benefits: [Benefits.WIFI, Benefits.FREE_PARKING],
        photo: [
          '../../assets/images/accommodation1.jpg',
          '../../assets/images/accommodation2.jpg',
          '../../assets/images/accommodation3.jpg',
        ],
        minGuests: 2,
        maxGuests: 6,
        priceType: PriceType.BY_PERSON,
        requestApproval: RequestApproval.AUTOMATIC,
        hostId: 111,
      },
      {
        id: 12,
        name: 'Desert Oasis',
        address: '56 Sand Dune Road, Phoenix',
        benefits: [
          Benefits.WIFI,
          Benefits.AIR_CONDITIONING,
          Benefits.FREE_PARKING,
        ],
        photo: [
          '../../assets/images/accommodation1.jpg',
          '../../assets/images/accommodation2.jpg',
          '../../assets/images/accommodation3.jpg',
        ],
        minGuests: 2,
        maxGuests: 5,
        priceType: PriceType.BY_ACCOMMODATION,
        requestApproval: RequestApproval.MANUALLY,
        hostId: 112,
      },
      {
        id: 13,
        name: 'Countryside Farmhouse',
        address: '100 Green Pastures, Kentucky',
        benefits: [Benefits.WIFI, Benefits.FREE_PARKING],
        photo: [
          '../../assets/images/accommodation1.jpg',
          '../../assets/images/accommodation2.jpg',
          '../../assets/images/accommodation3.jpg',
        ],
        minGuests: 3,
        maxGuests: 8,
        priceType: PriceType.BY_PERSON,
        requestApproval: RequestApproval.AUTOMATIC,
        hostId: 113,
      },
    ];
  }
}
