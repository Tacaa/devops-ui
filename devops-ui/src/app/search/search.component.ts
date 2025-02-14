import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccommodationService } from '../services/accommodation/accommodation.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  accommodations: any[] = [];
  searchData = {
    city: 'New York',
    country: 'USA',
    numGuest: 2,
    startDate: '2025-05-02',
    endDate: '2025-05-06',
  };

  constructor(
    private router: Router,
    private accommodationService: AccommodationService
  ) {}

  ngOnInit(): void {}

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
