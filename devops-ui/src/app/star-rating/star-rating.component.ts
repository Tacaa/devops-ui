import { Component, Input, OnInit } from '@angular/core';
import { AccommodationRatingService } from '../services/rating/accommodation-rating.service';
import { AccommodationReview } from '../shared/models/accommodation-review.model';
import { UserService } from '../services/user/user.service';
import { User } from '../services/mock/user.service';
import { HostRatingService } from '../services/rating/host-rating.service';
import { AccommodationEditReviewDialogComponent } from '../dialogs/accommodation-edit-review-dialog/accommodation-edit-review-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HostEditReviewDialogComponent } from '../dialogs/host-edit-review-dialog/host-edit-review-dialog.component';

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
  @Input() ratings!: {
    id: string;
    reviewerId: number;
    review: number;
    date: string;
  }[];

  users: User[] = [];

  //Temporary, should work with actual logged in user
  loggedInUserId: number = 1;

  constructor(
    private userService: UserService,
    private accommodationRatingService: AccommodationRatingService,
    private hostRatingService: HostRatingService,
    private dialog: MatDialog
  ) {}

  getStarArray(rating: number): boolean[] {
    return Array(5)
      .fill(false)
      .map((_, i) => i < rating);
  }

  getUserUsername(id: number) {
    return this.users.find((user) => user.id === id)?.username;
  }

  deleteReview(id: string) {
    if (this.forType === 'accommodation') {
      if (!id) {
        console.error('Cannot delete: Review ID is undefined');
        return;
      }

      this.accommodationRatingService.deleteAccommodationReview(id).subscribe({
        next: (response) => {
          console.log('Review deleted successfully', response);
          // Remove the deleted review from the local array
          this.ratings = this.ratings.filter((rating) => rating.id !== id);
        },
        error: (error) => {
          console.error('Error deleting review:', error);
          // Show error message to user
        },
      });
    } else if (this.forType === 'host') {
      if (!id) {
        console.error('Cannot delete: Review ID is undefined');
        return;
      }

      this.hostRatingService.deleteHostReview(id).subscribe({
        next: (response) => {
          console.log('Review deleted successfully', response);
          // Remove the deleted review from the local array
          this.ratings = this.ratings.filter((rating) => rating.id !== id);
        },
        error: (error) => {
          console.error('Error deleting review:', error);
          // Show error message to user
        },
      });
    }
  }

  openAccommodationEditReviewDialog(id: string): void {
    if (this.forType === 'accommodation') {
      const dialogRef = this.dialog.open(
        AccommodationEditReviewDialogComponent,
        {
          width: '300px',
          data: { reviewId: id },
        }
      );

      dialogRef.afterClosed().subscribe((updatedReview) => {
        if (updatedReview !== undefined) {
          this.accommodationRatingService
            .changeAccommodationReview(id, updatedReview)
            .subscribe({
              next: () => {
                console.log('Accommodation review updated successfully');
                window.location.reload();
              },
              error: (error) => {
                console.error('Error updating accommodation review:', error);
                alert(error.error.message);
              },
            });
        }
      });
    } else {
      const dialogRef = this.dialog.open(HostEditReviewDialogComponent, {
        width: '300px',
        data: { reviewId: id },
      });

      dialogRef.afterClosed().subscribe((updatedReview) => {
        if (updatedReview !== undefined) {
          this.hostRatingService.changeHostReview(id, updatedReview).subscribe({
            next: () => {
              console.log('Host review updated successfully');
              window.location.reload();
            },
            error: (error) => {
              console.error('Error updating host review:', error);
              alert(error.error.message);
            },
          });
        }
      });
    }
  }
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
