import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-accommodation-edit-review-dialog',
  templateUrl: './accommodation-edit-review-dialog.component.html',
  styleUrls: ['./accommodation-edit-review-dialog.component.css'],
})
export class AccommodationEditReviewDialogComponent {
  review: number = 5;

  constructor(
    public dialogRef: MatDialogRef<AccommodationEditReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { reviewId: string }
  ) {}

  submitUpdatedReview(): void {
    this.dialogRef.close({
      review: this.review,
      reviewId: this.data.reviewId,
      reviewerId: 1,
    });
  }
}
