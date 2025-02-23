import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-accommodation-review-dialog',
  templateUrl: './accommodation-review-dialog.component.html',
  styleUrls: ['./accommodation-review-dialog.component.css'],
})
export class AccommodationReviewDialogComponent {
  review: number = 5;

  constructor(
    public dialogRef: MatDialogRef<AccommodationReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { accommodationId: number }
  ) {}

  submitReview(): void {
    this.dialogRef.close({
      review: this.review,
      accommodationId: this.data.accommodationId,
      reviewerId: 1,
    });
  }
}
