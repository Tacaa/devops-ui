import { Component, OnInit } from '@angular/core';
import {
  Accommodation,
  AccommodationService,
} from '../services/accommodation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  accommodations: Accommodation[] = [];

  constructor(private accomodationService: AccommodationService) {}
  ngOnInit(): void {
    this.accommodations = this.accomodationService.getAll();
  }
}
