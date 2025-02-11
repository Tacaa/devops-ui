import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationService } from '../services/accommodation/accommodation.service';
import { Galleria } from 'primeng/galleria';
import { Observable } from 'rxjs';
import { Accommodation } from '../shared/models/accommodation.model';

@Component({
  selector: 'app-accommodation-page',
  templateUrl: './accommodation-page.component.html',
  styleUrls: ['./accommodation-page.component.css'],
})
export class AccommodationPageComponent implements OnInit {
  accommodation$: Observable<Accommodation> | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private accommodationService: AccommodationService
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params['id'])
        this.accommodation$ = accommodationService.getAccommodationById(
          params['id']
        );
    });
  }
  ngOnInit(): void {}
}
