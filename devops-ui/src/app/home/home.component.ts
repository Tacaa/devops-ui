import { Component, OnInit } from '@angular/core';
import { AccommodationService } from '../services/accommodation/accommodation.service';
import { Accommodation } from '../shared/models/accommodation.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  accommodations: Accommodation[] = [];

  constructor(
    private accommodationService: AccommodationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (
        params['city'] &&
        params['country'] &&
        params['numGuest'] &&
        params['startDate'] &&
        params['endDate']
      ) {
        this.accommodationService
          .searchAccommodations({
            city: params['city'],
            country: params['country'],
            numGuest: params['numGuest'],
            startDate: params['startDate'],
            endDate: params['endDate'],
          })
          .subscribe((response) => {
            this.accommodations = response.data.map(
              (item) => item.accommodationDTO
            );
            console.log(this.accommodations);
          });
      } else {
        this.accommodationService.getAllAccommodations().subscribe((data) => {
          this.accommodations = data;
        });
      }
    });
  }
}
