import { Component, Input, OnInit } from '@angular/core';
import { AccommodationRatingService } from '../services/rating/accommodation-rating.service';
import { AccommodationReview } from '../shared/models/accommodation-review.model';
import { UserService } from '../services/user/user.service';
import { User } from '../services/mock/user.service';

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
  @Input() forType!: string;
  @Input() averageRating!: number;
  @Input() ratings!: { reviewerId: number; review: number; date: string }[];

  users: User[] = [];

  constructor(private userService: UserService) {}

  getStarArray(rating: number): boolean[] {
    return Array(5)
      .fill(false)
      .map((_, i) => i < rating);
  }

  getUserUsername(id: number) {
    return this.users.find((user) => user.id === id)?.username;
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
