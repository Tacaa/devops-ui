import { TestBed } from '@angular/core/testing';

import { AccommodationRatingService } from './accommodation-rating.service';

describe('AccommodationRatingService', () => {
  let service: AccommodationRatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccommodationRatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
