import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Accommodation,
  AccommodationService,
} from '../services/accommodation.service';
import { Galleria } from 'primeng/galleria';

@Component({
  selector: 'app-accommodation-page',
  templateUrl: './accommodation-page.component.html',
  styleUrls: ['./accommodation-page.component.css'],
})
export class AccommodationPageComponent implements OnInit {
  accommodation!: Accommodation;

  constructor(
    private activatedRoute: ActivatedRoute,
    private accommodationService: AccommodationService
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params['id'])
        this.accommodation = accommodationService.getAccomodationById(
          params['id']
        );
    });
  }
  ngOnInit(): void {}
}
