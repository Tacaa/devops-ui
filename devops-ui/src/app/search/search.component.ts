import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccommodationService } from '../services/accommodation/accommodation.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  accommodations: any[] = [];
  searchData = {
    city: '',
    country: '',
    numGuest: 2,
    startDate: '2025-07-24',
    endDate: '2025-07-29',
  };

  constructor(
    private router: Router,
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
        this.searchData.city = params['city'];
        this.searchData.country = params['country'];
        this.searchData.numGuest = params['numGuest'];
        this.searchData.startDate = params['startDate'];
        this.searchData.endDate = params['endDate'];
      }
    });
  }

  searchAccommodations() {
    this.router.navigate(['/search'], {
      queryParams: { ...this.searchData },
    });

    this.accommodationService
      .searchAccommodations(this.searchData)
      .subscribe((response) => {
        this.accommodations = response.data.map(
          (item) => item.accommodationDTO
        );
        console.log(this.accommodations);
      });
  }
}
