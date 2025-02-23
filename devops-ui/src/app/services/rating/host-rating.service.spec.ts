import { TestBed } from '@angular/core/testing';

import { HostRatingService } from './host-rating.service';

describe('UserRatingService', () => {
  let service: HostRatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HostRatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
