import { Component, OnInit } from '@angular/core';
import { AccommodationService } from '../services/accommodation/accommodation.service';
import { Accommodation } from '../shared/models/accommodation.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  accommodations: Accommodation[] = [];

  constructor(private accommodationService: AccommodationService) {}

  ngOnInit(): void {
    this.accommodationService.getAllAccommodations().subscribe((data) => {
      this.accommodations = data;
    });

    console.log(this.accommodations);
  }
}
