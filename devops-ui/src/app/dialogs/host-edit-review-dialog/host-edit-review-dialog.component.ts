import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-host-edit-review-dialog',
  templateUrl: './host-edit-review-dialog.component.html',
  styleUrls: ['./host-edit-review-dialog.component.css'],
})
export class HostEditReviewDialogComponent {
  review: number = 5;

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<HostEditReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { reviewId: string }
  ) {}

  submitUpdatedReview(): void {
    this.dialogRef.close({
      review: this.review,
      reviewId: this.data.reviewId,
      reviewerId: this.authService.getUserId(),
    });
  }
}
