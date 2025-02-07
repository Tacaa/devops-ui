import { Component, Input, OnInit } from '@angular/core';

interface Rating {
  username: string;
  rating: number;
}

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
})
export class StarRatingComponent implements OnInit {
  @Input() forType: 'accommodation' | 'user' = 'accommodation';
  @Input() id: string = '';

  ratings: Rating[] = [];
  averageRating: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.ratings = this.getMockRatings();
    this.calculateAverageRating();
  }

  calculateAverageRating(): void {
    if (this.ratings.length > 0) {
      this.averageRating =
        this.ratings.reduce((sum, rating) => sum + rating.rating, 0) /
        this.ratings.length;
    }
  }

  getMockRatings(): Rating[] {
    return [
      { username: 'john_doe', rating: 4 },
      { username: 'jane_smith', rating: 5 },
      { username: 'mike_brown', rating: 3 },
    ];
  }

  getStarArray(rating: number): boolean[] {
    const roundedRating = Math.round(rating);
    return Array(5)
      .fill(false)
      .map((_, index) => index < roundedRating);
  }
}
